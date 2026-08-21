const SettingsRepository = require('../repositories/settings.repository');

class SettingsService {
  async getSettings() {
    return await SettingsRepository.getSettings();
  }

  async updateSettings(updateData, userId) {
    return await SettingsRepository.updateSettings(updateData, userId);
  }
}

module.exports = new SettingsService();

