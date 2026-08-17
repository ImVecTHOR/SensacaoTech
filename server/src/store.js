import fs from 'node:fs';
import path from 'node:path';

const DB_FILE = 'db.json';

let dbPath = null;
let records = new Map();
let dirty = false;

export function initStore(dataDir) {
    dbPath = path.join(dataDir, DB_FILE);

    if (fs.existsSync(dbPath)) {
        try {
            const raw = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            records = new Map(Object.entries(raw));
        } catch {
            records = new Map();
        }
    }

    setInterval(persist, 2000).unref();
}

function persist() {
    if (!dirty || !dbPath) return;
    dirty = false;
    const obj = Object.fromEntries(records);
    fs.writeFileSync(dbPath, JSON.stringify(obj));
}

export function setRecord(code, record) {
    records.set(code, record);
    dirty = true;
}

export function getRecord(code) {
    return records.get(code);
}

export function hasRecord(code) {
    return records.has(code);
}

export function deleteRecord(code) {
    const existed = records.delete(code);
    if (existed) dirty = true;
    return existed;
}

export function allRecords() {
    return records.entries();
}

export function flush() {
    persist();
}
