const { z } = require('zod');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Category name is required' })
      .min(2, 'Name must be at least 2 characters')
      .max(60, 'Name cannot exceed 60 characters')
      .trim(),
    slug: z
      .string()
      .min(2)
      .toLowerCase()
      .trim()
      .optional(),
    description: z.string().max(500).trim().optional(),
    parentCategory: z
      .string()
      .regex(objectIdRegex, 'Invalid parent category ID')
      .nullable()
      .optional(),
    image: z
      .object({
        url: z.string().url('Invalid image URL'),
        publicId: z.string(),
        altText: z.string().optional(),
      })
      .optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().regex(objectIdRegex, 'Invalid category ID format'),
  }),
  body: createCategorySchema.shape.body.partial(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
