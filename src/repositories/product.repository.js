const Product = require('../models/product.model');

class ProductRepository {
  async create(productData) {
    return await Product.create(productData);
  }

  async findAll({ filter = {}, skip = 0, limit = 10, sort = { createdAt: -1 } }) {
    return await Product.find(filter)
      .populate('categoryId', 'name slug')
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async count(filter = {}) {
    return await Product.countDocuments(filter);
  }

  async findById(id) {
    return await Product.findById(id)
      .populate('categoryId', 'name slug description')
      .exec();
  }

  async findBySlug(slug) {
    return await Product.findOne({ slug })
      .populate('categoryId', 'name slug')
      .exec();
  }

  async findBySku(sku) {
    return await Product.findOne({ sku }).exec();
  }

  async update(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id).exec();
  }
}

module.exports = new ProductRepository();
