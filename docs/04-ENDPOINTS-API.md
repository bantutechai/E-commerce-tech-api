---

### 📄 `docs/04-ENDPOINTS-API.md`

```markdown
# 4. Especificação de Endpoints da API RESTful

## Padronização de Respostas HTTP

### Sucesso (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "message": "Resource processed successfully.",
  "data": {}
}
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password.",
    "timestamp": "2026-08-21T21:55:00.000Z"
  }
}
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password.",
    "timestamp": "2026-08-21T21:55:00.000Z"
  }
}
