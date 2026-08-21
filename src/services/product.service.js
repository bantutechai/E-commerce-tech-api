const ProductRepository = require('../repositories/product.repository');
const CategoryRepository = require('../repositories/category.repository');
const AppError = require('../utils/appError.util');
const HTTP_STATUS = require('../constants/httpStatus');

class ProductService {
  async createProduct(productData) {
    // Generate slug from title if not provided
    if (!productData.slug) {
      productData.slug = productData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const existingProduct = await ProductRepository.findBySlug(productData.slug);
    if (existingProduct) {
      throw new AppError('A product with this slug already exists', HTTP_STATUS.CONFLICT, 'PRODUCT_SLUG_EXISTS');
    }

    const existingSku = await ProductRepository.findBySku(productData.sku);
    if (existingSku) {
      throw new AppError('A product with this SKU already exists', HTTP_STATUS.CONFLICT, 'PRODUCT_SKU_EXISTS');
    }

    const category = await CategoryRepository.findById(productData.categoryId);
    if (!category) {
      throw new AppError('Category not found', HTTP_STATUS.NOT_FOUND, 'CATEGORY_NOT_FOUND');
    }

    return await ProductRepository.create(productData);
  }

  async getProducts({ page = 1, limit = 10, search, categoryId, status, sortField = 'createdAt', sortOrder = 'desc' }) {
    const filter = {};
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (categoryId) filter.categoryId = categoryId;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const sort = { [sortField]: sortOrder === 'desc' ? -1 : 1 };

    const [products, total] = await Promise.all([
      ProductRepository.findAll({ filter, skip, limit, sort }),
      ProductRepository.count(filter),
    ]);

    return {
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found', HTTP_STATUS.NOT_FOUND, 'PRODUCT_NOT_FOUND');
    }
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await ProductRepository.update(id, updateData);
    if (!product) {
      throw new AppError('Product not found', HTTP_STATUS.NOT_FOUND, 'PRODUCT_NOT_FOUND');
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await ProductRepository.delete(id);
    if (!product) {
      throw new AppError('Product not found', HTTP_STATUS.NOT_FOUND, 'PRODUCT_NOT_FOUND');
    }
    return product;
  }
}

module.exports = new ProductService();
