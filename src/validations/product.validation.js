const { z } = require('zod');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const technicalSpecsSchema = z.object({
  processor: z.string().trim().optional(),
  ramMemory: z.string().trim().optional(),
  storageCapacity: z.string().trim().optional(),
  displaySize: z.string().trim().optional(),
  batteryCapacity: z.string().trim().optional(),
  operatingSystem: z.string().trim().optional(),
  connectivity: z.array(z.string()).optional(),
  customAttributes: z.record(z.string(), z.string()).optional(),
});

const productImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  publicId: z.string({ required_error: 'Public ID is required' }),
  altText: z.string().optional(),
  isMain: z.boolean().default(false),
});

const createProductSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Product title is required' })
      .min(3, 'Title must be at least 3 characters')
      .max(150, 'Title cannot exceed 150 characters')
      .trim(),
    brand: z
      .string({ required_error: 'Brand name is required' })
      .min(1, 'Brand cannot be empty')
      .trim(),
    model: z.string().trim().optional(),
    description: z
      .string({ required_error: 'Product description is required' })
      .min(10, 'Description must be at least 10 characters')
      .trim(),
    sku: z
      .string({ required_error: 'SKU is required' })
      .min(3, 'SKU must be at least 3 characters')
      .toUpperCase()
      .trim(),
    price: z
      .number({ required_error: 'Price is required' })
      .positive('Price must be greater than zero'),
    compareAtPrice: z.number().min(0).optional(),
    stockQuantity: z
      .number({ required_error: 'Stock quantity is required' })
      .int('Stock must be an integer')
      .min(0, 'Stock cannot be negative'),
    categoryId: z
      .string({ required_error: 'Category ID is required' })
      .regex(objectIdRegex, 'Invalid category ID format'),
    warrantyMonths: z.number().int().min(0).optional(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
    technicalSpecs: technicalSpecsSchema.optional(),
    images: z.array(productImageSchema).optional(),
  }),
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, 'Invalid product ID format'),
  }),
  body: createProductSchema.shape.body.partial(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};

