import crypto from 'node:crypto';
import { hasRecord } from './store.js';

// Alfabeto sem caracteres ambíguos (sem 0/O, 1/I/L)
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const CODE_LENGTH = 8;

function randomCode() {
    const bytes = crypto.randomBytes(CODE_LENGTH);
    let out = '';
    for (let i = 0; i < CODE_LENGTH; i++) {
        out += ALPHABET[bytes[i] % ALPHABET.length];
    }
    return out;
}

export function generateUniqueCode() {
    let code = randomCode();
    let attempts = 0;
    while (hasRecord(code) && attempts < 10) {
        code = randomCode();
        attempts++;
    }
    return code;
}
