const CategoryRepository = require('../repositories/category.repository');
const AppError = require('../utils/appError.util');
const HTTP_STATUS = require('../constants/httpStatus');

class CategoryService {
  async createCategory(categoryData) {
    // Generate slug from name if not provided
    if (!categoryData.slug) {
      categoryData.slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const existingCategory = await CategoryRepository.findBySlug(categoryData.slug);
    if (existingCategory) {
      throw new AppError(
        'A category with this slug already exists',
        HTTP_STATUS.CONFLICT,
        'CATEGORY_SLUG_EXISTS'
      );
    }

    if (categoryData.parentCategory) {
      const parent = await CategoryRepository.findById(categoryData.parentCategory);
      if (!parent) {
        throw new AppError(
          'Parent category not found',
          HTTP_STATUS.NOT_FOUND,
          'PARENT_CATEGORY_NOT_FOUND'
        );
      }
    }

    return await CategoryRepository.create(categoryData);
  }

  async getCategories(filter = {}) {
    return await CategoryRepository.findAll(filter);
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw new AppError('Category not found', HTTP_STATUS.NOT_FOUND, 'CATEGORY_NOT_FOUND');
    }
    return category;
  }

  async updateCategory(id, updateData) {
    const category = await CategoryRepository.update(id, updateData);
    if (!category) {
      throw new AppError('Category not found', HTTP_STATUS.NOT_FOUND, 'CATEGORY_NOT_FOUND');
    }
    return category;
  }

  async deleteCategory(id) {
    const category = await CategoryRepository.delete(id);
    if (!category) {
      throw new AppError('Category not found', HTTP_STATUS.NOT_FOUND, 'CATEGORY_NOT_FOUND');
    }
    return category;
  }
}

module.exports = new CategoryService();
