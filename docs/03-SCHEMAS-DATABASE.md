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

{
  _id: ObjectId,
  name: String,
  slug: { type: String, unique: true, index: true },
  description: String,
  parentCategory: { type: ObjectId, ref: 'categories', default: null },
  image: { url: String, publicId: String, altText: String },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
{
  _id: ObjectId,
  title: String,
  slug: { type: String, unique: true, index: true },
  brand: { type: String, index: true },
  model: String,
  description: String,
  sku: { type: String, unique: true },
  price: Number,
  compareAtPrice: Number,
  stockQuantity: Number,
  categoryId: { type: ObjectId, ref: 'categories', index: true },
  warrantyMonths: Number,
  status: Enum['DRAFT', 'PUBLISHED', 'ARCHIVED'],
  technicalSpecs: {
    processor: String,
    ramMemory: String,
    storageCapacity: String,
    displaySize: String,
    batteryCapacity: String,
    operatingSystem: String,
    connectivity: [String],
    customAttributes: Map
  },
  images: [{ url: String, publicId: String, altText: String, isMain: Boolean }],
  createdAt: Date,
  updatedAt: Date
}
{
  _id: ObjectId,
  siteTitle: String,
  siteDescription: String,
  logo: { url: String, publicId: String, altText: String },
  faviconUrl: String,
  aboutFooter: String,
  contactInfo: { email: String, phone: String, whatsapp: String, supportHours: String },
  address: { street: String, number: String, neighborhood: String, city: String, province: String, country: String, postalCode: String },
  socialMedia: { facebook: String, instagram: String, twitter: String, youtube: String, linkedin: String },
  updatedBy: { type: ObjectId, ref: 'users' },
  updatedAt: Date
}
{
  _id: ObjectId,
  filename: String,
  mimeType: String,
  sizeBytes: Number,
  url: String,
  storageKey: String,
  altText: String,
  uploadedBy: { type: ObjectId, ref: 'users' },
  createdAt: Date
}
