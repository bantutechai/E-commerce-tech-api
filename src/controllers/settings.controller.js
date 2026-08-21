const SettingsService = require('../services/settings.service');
const ApiResponse = require('../utils/response.util');

class SettingsController {
  async getSettings(req, res, next) {
    try {
      const settings = await SettingsService.getSettings();
      return ApiResponse.success(res, 'Store settings retrieved successfully', settings);
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const settings = await SettingsService.updateSettings(req.body, req.user.id);
      return ApiResponse.success(res, 'Store settings updated successfully', settings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SettingsController();
