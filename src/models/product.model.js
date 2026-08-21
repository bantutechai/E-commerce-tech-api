const mongoose = require('mongoose');

const technicalSpecsSchema = new mongoose.Schema(
  {
    processor: { type: String, trim: true, default: '' },
    ramMemory: { type: String, trim: true, default: '' },
    storageCapacity: { type: String, trim: true, default: '' },
    displaySize: { type: String, trim: true, default: '' },
    batteryCapacity: { type: String, trim: true, default: '' },
    operatingSystem: { type: String, trim: true, default: '' },
    connectivity: [{ type: String, trim: true }],
    customAttributes: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { _id: false }
);

const productImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    altText: { type: String, default: '' },
    isMain: { type: Boolean, default: false },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [150, 'Product title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      index: true,
    },
    model: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative'],
      default: 0,
    },
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
      index: true,
    },
    warrantyMonths: {
      type: Number,
      default: 12,
      min: [0, 'Warranty months cannot be negative'],
    },
    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      default: 'DRAFT',
      index: true,
    },
    technicalSpecs: {
      type: technicalSpecsSchema,
      default: () => ({}),
    },
    images: [productImageSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound Index for Search and Filtering
productSchema.index({ title: 'text', brand: 'text', model: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

