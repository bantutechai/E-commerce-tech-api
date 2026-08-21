const CategoryService = require('../services/category.service');
const ApiResponse = require('../utils/response.util');
const HTTP_STATUS = require('../constants/httpStatus');

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const category = await CategoryService.createCategory(req.body);
      return ApiResponse.success(
        res,
        'Category created successfully',
        category,
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await CategoryService.getCategories(req.query);
      return ApiResponse.success(res, 'Categories retrieved successfully', categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      return ApiResponse.success(res, 'Category retrieved successfully', category);
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      return ApiResponse.success(res, 'Category updated successfully', category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      return ApiResponse.success(res, 'Category deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();

