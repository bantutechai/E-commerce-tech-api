const ProductService = require('../services/product.service');
const ApiResponse = require('../utils/response.util');
const HTTP_STATUS = require('../constants/httpStatus');

class ProductController {
  async createProduct(req, res, next) {
    try {
      const product = await ProductService.createProduct(req.body);
      return ApiResponse.success(
        res,
        'Product created successfully',
        product,
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const result = await ProductService.getProducts(req.query);
      return ApiResponse.success(res, 'Products retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      return ApiResponse.success(res, 'Product retrieved successfully', product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      return ApiResponse.success(res, 'Product updated successfully', product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      await ProductService.deleteProduct(req.params.id);
      return ApiResponse.success(res, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
