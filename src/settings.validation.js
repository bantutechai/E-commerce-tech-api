const { z } = require('zod');

const updateSettingsSchema = z.object({
  body: z.object({
    siteTitle: z.string().min(1).trim().optional(),
    siteDescription: z.string().trim().optional(),
    logo: z
      .object({
        url: z.string().url().optional(),
        publicId: z.string().optional(),
        altText: z.string().optional(),
      })
      .optional(),
    faviconUrl: z.string().url().or(z.literal('')).optional(),
    aboutFooter: z.string().optional(),
    contactInfo: z
      .object({
        email: z.string().email().or(z.literal('')).optional(),
        phone: z.string().optional(),
        whatsapp: z.string().optional(),
        supportHours: z.string().optional(),
      })
      .optional(),
    address: z
      .object({
        street: z.string().optional(),
        number: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        country: z.string().optional(),
        postalCode: z.string().optional(),
      })
      .optional(),
    socialMedia: z
      .object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        linkedin: z.string().optional(),
      })
      .optional(),
  }),
});

module.exports = {
  updateSettingsSchema,
};
