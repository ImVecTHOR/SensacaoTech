/* =========================
   CORREIOS - config
   Troque API_BASE para a URL do seu backend em produção,
   ex: 'https://correios-api.onrender.com'
========================= */
const CORREIOS_API_BASE = window.CORREIOS_API_BASE || 'http://localhost:3001';
const CORREIOS_PBKDF2_ITERATIONS = 250000;

(function () {
    const enviarPanel = document.getElementById('enviarPanel');
    if (!enviarPanel) return; // não estamos na página correios.html

    /* =========================
       HELPERS
    ========================= */
    function bufToBase64(buf) {
        const bytes = new Uint8Array(buf);
        let binary = '';
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
        }
        return btoa(binary);
    }

    function base64ToBuf(b64) {
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return bytes.buffer;
    }

    function formatBytes(bytes) {
        if (bytes < 1024) return `${bytes} B`;
        const units = ['KB', 'MB', 'GB'];
        let value = bytes;
        let unitIndex = -1;
        do {
            value /= 1024;
            unitIndex++;
        } while (value >= 1024 && unitIndex < units.length - 1);
        return `${value.toFixed(1)} ${units[unitIndex]}`;
    }

    function setStatus(el, text, type) {
        el.textContent = text || '';
        el.className = 'correios-status' + (type ? ` correios-status-${type}` : '');
    }

    async function deriveKey(password, saltBuf) {
        const baseKey = await crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: saltBuf, iterations: CORREIOS_PBKDF2_ITERATIONS, hash: 'SHA-256' },
            baseKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    function generateStrongPassword(length = 20) {
        const alphabet =
            'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
        const values = crypto.getRandomValues(new Uint32Array(length));
        let out = '';
        for (let i = 0; i < length; i++) out += alphabet[values[i] % alphabet.length];
        return out;
    }

    /* =========================
       TABS
    ========================= */
    const tabButtons = document.querySelectorAll('.correios-tab-btn');
    const panels = {
        enviar: document.getElementById('enviarPanel'),
        receber: document.getElementById('receberPanel'),
    };

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            Object.entries(panels).forEach(([key, panel]) => {
                panel.classList.toggle('active', key === btn.dataset.tab);
            });
        });
    });

    /* =========================
       ENVIAR
    ========================= */
    const fileInput = document.getElementById('correiosFileInput');
    const fileNameLabel = document.getElementById('correiosFileName');
    const sendPasswordInput = document.getElementById('correiosSendPassword');
    const genBtn = document.getElementById('correiosGenBtn');
    const sendBtn = document.getElementById('correiosSendBtn');
    const sendStatus = document.getElementById('correiosSendStatus');
    const sendResult = document.getElementById('correiosSendResult');
    const resultCode = document.getElementById('correiosResultCode');
    const resultPassword = document.getElementById('correiosResultPassword');
    const resultExpiry = document.getElementById('correiosResultExpiry');
    const copyCodeBtn = document.getElementById('correiosCopyCodeBtn');
    const copyPasswordBtn = document.getElementById('correiosCopyPasswordBtn');

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        fileNameLabel.textContent = file
            ? `${file.name} (${formatBytes(file.size)})`
            : 'Nenhum arquivo selecionado';
    });

    genBtn.addEventListener('click', () => {
        sendPasswordInput.value = generateStrongPassword();
    });

    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resultCode.textContent).catch(() => {});
    });

    copyPasswordBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resultPassword.textContent).catch(() => {});
    });

    sendBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        const password = sendPasswordInput.value;

        if (!file) {
            setStatus(sendStatus, 'Selecione um arquivo primeiro.', 'error');
            return;
        }
        if (!password || password.length < 4) {
            setStatus(sendStatus, 'Digite uma senha (ou clique em "Gerar").', 'error');
            return;
        }

        sendBtn.disabled = true;
        sendResult.classList.add('hidden');
        setStatus(sendStatus, 'Cifrando arquivo no navegador...', 'loading');

        try {
            const saltBuf = crypto.getRandomValues(new Uint8Array(16)).buffer;
            const key = await deriveKey(password, saltBuf);

            const ivFileBuf = crypto.getRandomValues(new Uint8Array(12)).buffer;
            const fileBuf = await file.arrayBuffer();
            const cipherFile = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: ivFileBuf },
                key,
                fileBuf
            );

            const metaObj = {
                name: file.name,
                type: file.type || 'application/octet-stream',
                size: file.size,
            };
            const ivMetaBuf = crypto.getRandomValues(new Uint8Array(12)).buffer;
            const cipherMeta = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: ivMetaBuf },
                key,
                new TextEncoder().encode(JSON.stringify(metaObj))
            );

            setStatus(sendStatus, 'Enviando arquivo cifrado...', 'loading');

            const formData = new FormData();
            formData.append('blob', new Blob([cipherFile]), 'blob.bin');
            formData.append('salt', bufToBase64(saltBuf));
            formData.append('ivFile', bufToBase64(ivFileBuf));
            formData.append('ivMeta', bufToBase64(ivMetaBuf));
            formData.append('meta', bufToBase64(cipherMeta));

            const res = await fetch(`${CORREIOS_API_BASE}/api/correios`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                if (res.status === 413) {
                    setStatus(sendStatus, 'Arquivo muito grande para o servidor.', 'error');
                } else if (res.status === 429) {
                    setStatus(sendStatus, 'Muitos envios em pouco tempo, tente novamente mais tarde.', 'error');
                } else {
                    setStatus(sendStatus, 'Falha ao enviar o arquivo. Tente novamente.', 'error');
                }
                return;
            }

            const data = await res.json();
            resultCode.textContent = data.code;
            resultPassword.textContent = password;
            const expiryDate = new Date(data.expiresAt);
            resultExpiry.textContent = `Disponível até ${expiryDate.toLocaleString('pt-BR')} ou até o primeiro download, o que vier primeiro.`;
            sendResult.classList.remove('hidden');
            setStatus(sendStatus, 'Enviado com sucesso!', 'success');
        } catch (err) {
            console.error(err);
            setStatus(sendStatus, 'Erro inesperado ao cifrar/enviar o arquivo.', 'error');
        } finally {
            sendBtn.disabled = false;
        }
    });

    /* =========================
       RECEBER
    ========================= */
    const codeInput = document.getElementById('correiosCodeInput');
    const lookupBtn = document.getElementById('correiosLookupBtn');
    const lookupStatus = document.getElementById('correiosLookupStatus');
    const receivePasswordField = document.getElementById('correiosReceivePasswordField');
    const receivePasswordInput = document.getElementById('correiosReceivePassword');
    const unlockBtn = document.getElementById('correiosUnlockBtn');
    const unlockStatus = document.getElementById('correiosUnlockStatus');
    const fileInfo = document.getElementById('correiosFileInfo');
    const fileInfoName = document.getElementById('correiosFileInfoName');
    const fileInfoMeta = document.getElementById('correiosFileInfoMeta');
    const downloadBtn = document.getElementById('correiosDownloadBtn');
    const downloadStatus = document.getElementById('correiosDownloadStatus');

    let currentRecord = null; // { code, salt, ivFile, ivMeta, meta, size, expiresAt }
    let currentKey = null;
    let currentMetaObj = null;

    function resetReceiveState() {
        currentRecord = null;
        currentKey = null;
        currentMetaObj = null;
        receivePasswordField.classList.add('hidden');
        fileInfo.classList.add('hidden');
        setStatus(unlockStatus, '');
        setStatus(downloadStatus, '');
    }

    lookupBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim().toUpperCase();
        if (!code) {
            setStatus(lookupStatus, 'Digite o código recebido.', 'error');
            return;
        }

        resetReceiveState();
        lookupBtn.disabled = true;
        setStatus(lookupStatus, 'Procurando...', 'loading');

        try {
            const res = await fetch(`${CORREIOS_API_BASE}/api/correios/${encodeURIComponent(code)}/meta`);

            if (res.status === 404) {
                setStatus(lookupStatus, 'Código inválido, expirado ou já utilizado.', 'error');
                return;
            }
            if (res.status === 429) {
                setStatus(lookupStatus, 'Muitas tentativas, aguarde um pouco.', 'error');
                return;
            }
            if (!res.ok) {
                setStatus(lookupStatus, 'Erro ao buscar o arquivo.', 'error');
                return;
            }

            const data = await res.json();
            currentRecord = { code, ...data };
            setStatus(lookupStatus, 'Arquivo encontrado! Digite a senha para desbloquear.', 'success');
            receivePasswordField.classList.remove('hidden');
        } catch (err) {
            console.error(err);
            setStatus(lookupStatus, 'Erro de conexão com o servidor.', 'error');
        } finally {
            lookupBtn.disabled = false;
        }
    });

    unlockBtn.addEventListener('click', async () => {
        if (!currentRecord) return;
        const password = receivePasswordInput.value;
        if (!password) {
            setStatus(unlockStatus, 'Digite a senha.', 'error');
            return;
        }

        unlockBtn.disabled = true;
        setStatus(unlockStatus, 'Verificando senha...', 'loading');

        try {
            const saltBuf = base64ToBuf(currentRecord.salt);
            const key = await deriveKey(password, saltBuf);
            const metaPlain = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: base64ToBuf(currentRecord.ivMeta) },
                key,
                base64ToBuf(currentRecord.meta)
            );
            const metaObj = JSON.parse(new TextDecoder().decode(metaPlain));

            currentKey = key;
            currentMetaObj = metaObj;

            fileInfoName.textContent = metaObj.name;
            fileInfoMeta.textContent = `${formatBytes(metaObj.size)} · expira em ${new Date(currentRecord.expiresAt).toLocaleString('pt-BR')}`;
            fileInfo.classList.remove('hidden');
            setStatus(unlockStatus, 'Senha correta!', 'success');
        } catch (err) {
            setStatus(unlockStatus, 'Senha incorreta.', 'error');
        } finally {
            unlockBtn.disabled = false;
        }
    });

    downloadBtn.addEventListener('click', async () => {
        if (!currentRecord || !currentKey || !currentMetaObj) return;

        downloadBtn.disabled = true;
        setStatus(downloadStatus, 'Baixando arquivo cifrado...', 'loading');

        try {
            const res = await fetch(`${CORREIOS_API_BASE}/api/correios/${encodeURIComponent(currentRecord.code)}/file`);

            if (res.status === 404) {
                setStatus(downloadStatus, 'Arquivo não está mais disponível (expirado ou já baixado).', 'error');
                return;
            }
            if (!res.ok) {
                setStatus(downloadStatus, 'Erro ao baixar o arquivo.', 'error');
                return;
            }

            const cipherBuf = await res.arrayBuffer();

            setStatus(downloadStatus, 'Decifrando...', 'loading');
            const plainBuf = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: base64ToBuf(currentRecord.ivFile) },
                currentKey,
                cipherBuf
            );

            const blob = new Blob([plainBuf], { type: currentMetaObj.type });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = currentMetaObj.name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 10000);

            setStatus(downloadStatus, 'Download concluído! O arquivo foi removido do servidor.', 'success');
        } catch (err) {
            console.error(err);
            setStatus(downloadStatus, 'Erro ao decifrar o arquivo (dados corrompidos?).', 'error');
        } finally {
            downloadBtn.disabled = false;
        }
    });
})();
