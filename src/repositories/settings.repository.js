const StoreSettings = require('../models/settings.model');

class SettingsRepository {
  async getSettings() {
    let settings = await StoreSettings.findOne().exec();
    if (!settings) {
      settings = await StoreSettings.create({});
    }
    return settings;
  }

  async updateSettings(updateData, userId) {
    let settings = await StoreSettings.findOne().exec();
    if (!settings) {
      return await StoreSettings.create({ ...updateData, updatedBy: userId });
    }

    Object.assign(settings, updateData, { updatedBy: userId });
    return await settings.save();
  }
}

module.exports = new SettingsRepository();
