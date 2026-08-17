import fs from 'node:fs';
import path from 'node:path';
import { allRecords, deleteRecord } from './store.js';

export function purgeRecord(blobsDir, code) {
    deleteRecord(code);
    deleteBlob(blobsDir, code);
}

export function deleteBlob(blobsDir, code) {
    const filePath = path.join(blobsDir, `${code}.bin`);
    fs.unlink(filePath, () => {});
}

export function isExpired(record) {
    return Date.now() >= record.expiresAt;
}

export function startCleanupJob(blobsDir, intervalMs = 5 * 60 * 1000) {
    const sweep = () => {
        for (const [code, record] of allRecords()) {
            if (isExpired(record)) {
                purgeRecord(blobsDir, code);
            }
        }
    };
    sweep();
    setInterval(sweep, intervalMs).unref();
}
