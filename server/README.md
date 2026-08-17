# Correios API

Backend do sistema de "Correios" do SensaçãoTech: você sobe um arquivo em um
dispositivo, recebe um **código** e escolhe uma **senha**, e em outro
dispositivo usa os dois para baixar o arquivo de volta.

O arquivo é criptografado **no navegador de quem envia** (AES-256-GCM, chave
derivada da senha via PBKDF2) antes de sair da máquina. O servidor só guarda
bytes cifrados — ele nunca vê o conteúdo real nem o nome do arquivo. Por isso
o código sozinho não abre o arquivo: também é preciso saber a senha.

Cada arquivo expira automaticamente depois do primeiro download completo ou
depois de 24h (o que vier primeiro).

## Rodando localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou mais novo instalado.

```bash
cd server
npm install
cp .env.example .env
npm start
```

A API sobe em `http://localhost:3001` por padrão. Para testar com o site,
abra `correios.html` no navegador — por padrão o frontend já aponta para
`http://localhost:3001` (veja `CORREIOS_API_BASE` no topo de `correios.js`
na raiz do projeto).

## Variáveis de ambiente (`.env`)

| Variável          | Padrão | Descrição                                              |
| ----------------- | ------ | -------------------------------------------------------- |
| `PORT`             | `3001` | Porta da API                                              |
| `ALLOWED_ORIGINS`  | `*`    | Domínios do frontend com permissão de CORS, separados por vírgula |
| `MAX_FILE_MB`      | `100`  | Tamanho máximo de arquivo aceito                          |
| `EXPIRY_HOURS`     | `24`   | Horas até expirar um arquivo não baixado                  |
| `DATA_DIR`         | `./data` | Onde salvar metadados e os arquivos cifrados             |

Em produção, troque `ALLOWED_ORIGINS=*` pelo domínio real do site, por
exemplo `ALLOWED_ORIGINS=https://sensacaotech.com`.

## Onde hospedar

O site atual é estático (HTML/CSS/JS puro), então dá pra continuar hospedando
ele onde já está (GitHub Pages, Netlify, Vercel, etc). Essa API é um processo
Node separado que precisa ficar sempre rodando e com um disco para guardar os
arquivos cifrados temporariamente — por isso ela deve ser hospedada à parte.
Duas opções razoáveis, dependendo do quanto você quer se preocupar com
manutenção:

**1. Render.com (Web Service gratuito) — mais simples de começar**
- Zero custo, deploy direto do GitHub, HTTPS automático.
- Ponto de atenção: no plano gratuito o serviço "dorme" após ~15 min sem uso
  e o disco é apagado a cada redeploy/reinício. Como os arquivos já expiram
  em até 24h de qualquer forma, o risco prático é baixo, mas um arquivo pode
  ser perdido se o servidor reiniciar antes do destinatário baixar.
- Configuração: New → Web Service → aponte para este repositório com
  "Root Directory" = `server`, build command `npm install`, start command
  `npm start`, e defina as variáveis de ambiente acima.

**2. VPS barato com disco persistente (Hetzner, Oracle Cloud Free Tier, etc.) — mais confiável**
- Sem reinícios inesperados apagando arquivos no meio do caminho.
- Exige mais configuração manual (Node instalado, processo mantido no ar com
  `pm2` ou `systemd`, e um Nginx como proxy reverso com HTTPS via Let's
  Encrypt).
- Exemplo de systemd (`/etc/systemd/system/correios-api.service`):

```ini
[Unit]
Description=Correios API
After=network.target

[Service]
WorkingDirectory=/caminho/para/server
ExecStart=/usr/bin/node server.js
Restart=always
EnvironmentFile=/caminho/para/server/.env
User=www-data

[Install]
WantedBy=multi-user.target
```

E um bloco de Nginx como proxy reverso (com certificado via `certbot`):

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    client_max_body_size 110m;
}
```

Se optar pelo Nginx acima na frente da API, ajuste `CORREIOS_API_BASE` no
`correios.js` do site para `''` (string vazia) se o site e a API ficarem no
mesmo domínio, ou para a URL completa (`https://api.seudominio.com`) se
ficarem em domínios/subdomínios diferentes — nesse caso configure
`ALLOWED_ORIGINS` de acordo.

## Segurança — o que já está implementado

- Criptografia ponta-a-ponta: o servidor nunca vê o arquivo nem o nome
  original, só bytes cifrados + salt/IV (não são segredo, só servem para
  derivar a chave).
- Código de 8 caracteres aleatórios (sem caracteres ambíguos) — funciona como
  "endereço" do arquivo, independente da senha.
- Download de uso único: o arquivo é apagado do servidor assim que o
  download é concluído com sucesso.
- Expiração automática em 24h mesmo que ninguém baixe.
- Rate limiting básico nas rotas de upload/consulta/download para dificultar
  força bruta do código.

## Limitações a ter em mente

- O código tem entropia razoável, mas não é infinita — combine sempre com
  uma senha forte (o botão "Gerar" no site já cria uma). Sem senha forte, a
  segurança do sistema cai bastante.
- O metadata store é um arquivo JSON simples em disco, adequado para o
  volume de uso de um site pessoal. Se o uso crescer muito, vale migrar para
  um banco de verdade (SQLite/Postgres).
- Não há autenticação de quem pode enviar arquivos — qualquer pessoa que
  acesse `correios.html` pode subir um arquivo. O rate limiting reduz abuso,
  mas não elimina.
