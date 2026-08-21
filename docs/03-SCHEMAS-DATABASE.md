# 3. Modelagem do Banco de Dados (MongoDB / Mongoose)

## Coleções do Sistema

### 1. `users` (Administradores)
```typescript
{
  _id: ObjectId,
  fullName: String,
  email: { type: String, unique: true, index: true },
  passwordHash: { type: String, select: false },
  role: Enum['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'INVENTORY_MANAGER'],
  isActive: Boolean,
  lastLoginAt: Date,
  createdAt: Date,
  updatedAt: Date
}

