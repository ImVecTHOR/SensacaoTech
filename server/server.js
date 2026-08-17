import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { initStore, setRecord, getRecord, deleteRecord } from './src/store.js';
import { generateUniqueCode } from './src/codes.js';
import { purgeRecord, deleteBlob, isExpired, startCleanupJob } from './src/cleanup.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT || 3001);
const MAX_FILE_MB = Number(process.env.MAX_FILE_MB || 100);
const EXPIRY_MS = Number(process.env.EXPIRY_HOURS || 24) * 60 * 60 * 1000;
const DATA_DIR = path.resolve(__dirname, process.env.DATA_DIR || './data');
const BLOBS_DIR = path.join(DATA_DIR, 'blobs');
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

fs.mkdirSync(BLOBS_DIR, { recursive: true });
initStore(DATA_DIR);
startCleanupJob(BLOBS_DIR);

const app = express();
app.disable('x-powered-by');

app.use(
    cors({
        origin: ALLOWED_ORIGINS.includes('*') ? true : ALLOWED_ORIGINS,
    })
);

// -------- Upload --------
const storage = multer.diskStorage({
    destination: BLOBS_DIR,
    filename: (req, _file, cb) => {
        const code = generateUniqueCode();
        req.correiosCode = code;
        cb(null, `${code}.bin`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_MB * 1024 * 1024, fields: 10 },
});

const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

const lookupLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
});

app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
});

app.post('/api/correios', uploadLimiter, (req, res) => {
    upload.single('blob')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ error: 'file_too_large', maxMb: MAX_FILE_MB });
            }
            return res.status(400).json({ error: 'upload_failed' });
        }

        const { salt, ivFile, ivMeta, meta } = req.body || {};
        const code = req.correiosCode;

        if (!req.file || !salt || !ivFile || !ivMeta || !meta || !code) {
            if (req.file) fs.unlink(req.file.path, () => {});
            return res.status(400).json({ error: 'missing_fields' });
        }

        const now = Date.now();
        const record = {
            code,
            salt,
            ivFile,
            ivMeta,
            meta,
            size: req.file.size,
            createdAt: now,
            expiresAt: now + EXPIRY_MS,
        };

        setRecord(code, record);

        res.status(201).json({ code, expiresAt: record.expiresAt });
    });
});

// -------- Metadados (para conferir a senha antes de baixar) --------
app.get('/api/correios/:code/meta', lookupLimiter, (req, res) => {
    const code = (req.params.code || '').toUpperCase();
    const record = getRecord(code);

    if (!record) {
        return res.status(404).json({ error: 'not_found' });
    }

    if (isExpired(record)) {
        purgeRecord(BLOBS_DIR, code);
        return res.status(404).json({ error: 'not_found' });
    }

    res.json({
        salt: record.salt,
        ivFile: record.ivFile,
        ivMeta: record.ivMeta,
        meta: record.meta,
        size: record.size,
        expiresAt: record.expiresAt,
    });
});

// -------- Download do arquivo cifrado (uso único) --------
app.get('/api/correios/:code/file', lookupLimiter, (req, res) => {
    const code = (req.params.code || '').toUpperCase();
    const record = getRecord(code);

    if (!record) {
        return res.status(404).json({ error: 'not_found' });
    }

    if (isExpired(record)) {
        purgeRecord(BLOBS_DIR, code);
        return res.status(404).json({ error: 'not_found' });
    }

    const filePath = path.join(BLOBS_DIR, `${code}.bin`);

    // Remove o registro já aqui (síncrono, sem I/O entre a leitura e a
    // remoção) para que uma segunda requisição concorrente com o mesmo
    // código não consiga baixar o mesmo arquivo.
    deleteRecord(code);

    res.sendFile(filePath, () => {
        deleteBlob(BLOBS_DIR, code);
    });
});

app.listen(PORT, () => {
    console.log(`Correios API rodando em http://localhost:${PORT}`);
});
