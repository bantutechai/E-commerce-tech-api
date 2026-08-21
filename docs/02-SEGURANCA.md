---

### 📄 `docs/02-SEGURANCA.md`

```markdown
# 2. Arquitetura de Segurança e Defesa em Profundidade

## Objetivos de Segurança
Proteger a API contra varreduras automatizadas, ataques de força bruta, injeções de dados e acesso não autorizado.

## Estratégias de Mitigação

### 1. Prevenção Contra Reconhecimento (ex: Nmap, Scanners)
* **Header Stripping**: Remoção dos cabeçalhos `X-Powered-By` para ocultar a stack (Express/Node.js).
* **HTTP Method Filtering**: Bloqueio de métodos não permitidos (`TRACE`, `TRACK`, `CONNECT`).
* **Honeypot e Block Rate Limit**: Tentativas repetidas em rotas inexistentes disparam bloqueio temporário de IP.

### 2. Prevenção Contra Injeções (ex: SQLMap, NoSQL Injection, XSS)
* **Express Mongo Sanitize**: Remove operadores de consulta MongoDB (`$gt`, `$ne`, `$where`, `.`) recebidos no `req.body`, `req.query` ou `req.params`.
* **Validação com Zod**: Descarta propriedades não declaradas no esquema (Previne *Mass Assignment*).
* **Helmet.js**: Configuração de Content Security Policy (CSP), HTTP Strict Transport Security (HSTS) e proteção XSS.

### 3. Autenticação e Gestão de Sessão
* **Access Token**: JWT de curta duração (15 min) enviado via header `Authorization: Bearer <token>`.
* **Refresh Token**: JWT de longa duração (7 dias) armazenado em Cookie `HttpOnly`, `Secure`, `SameSite=Strict`.
* **Hash de Senha**: Algoritmo `Argon2id` ou `Bcrypt` com salting e fator de custo mínimo 12.
* **Rate Limiting no Login**: Máximo de 5 tentativas a cada 15 minutos por IP.
