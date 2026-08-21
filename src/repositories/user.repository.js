const User = require('../models/user.model');

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    if (includePassword) {
      query.select('+passwordHash');
    }
    return await query.exec();
  }

  async findById(id) {
    return await User.findById(id).exec();
  }

  async updateLastLogin(id) {
    return await User.findByIdAndUpdate(
      id,
      { lastLoginAt: new Date() },
      { new: true }
    ).exec();
  }
}

module.exports = new UserRepository();

