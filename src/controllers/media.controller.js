const ApiResponse = require('../utils/response.util');
const HTTP_STATUS = require('../constants/httpStatus');

class MediaController {
  async uploadMedia(req, res, next) {
    try {
      return ApiResponse.success(
        res,
        'Media uploaded successfully',
        {
          url: req.file ? req.file.path : '',
          filename: req.file ? req.file.filename : '',
        },
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteMedia(req, res, next) {
    try {
      return ApiResponse.success(res, 'Media deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MediaController();
