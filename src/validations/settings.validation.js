const { z } = require('zod');

const updateSettingsSchema = z.object({
  storeName: z.string().min(2, 'O nome da loja deve ter pelo menos 2 caracteres').optional(),
  contactEmail: z.string().email('E-mail de contato inválido').toLowerCase().optional(),
  phone: z.string().optional(),
  currency: z.string().default('AOA').optional(),
  address: z.string().optional(),
});

module.exports = {
  updateSettingsSchema,
};
