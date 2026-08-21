const Category = require('../models/category.model');

class CategoryRepository {
  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async findAll(filter = {}) {
    return await Category.find(filter)
      .populate('parentCategory', 'name slug')
      .sort({ name: 1 })
      .exec();
  }

  async findById(id) {
    return await Category.findById(id)
      .populate('parentCategory', 'name slug')
      .exec();
  }

  async findBySlug(slug) {
    return await Category.findOne({ slug }).exec();
  }

  async update(id, updateData) {
    return await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async delete(id) {
    return await Category.findByIdAndDelete(id).exec();
  }
}

module.exports = new CategoryRepository();
