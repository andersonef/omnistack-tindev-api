const Dev = require('../models/Dev');
const likeService = require('../services/LikeService');

module.exports = {
    async store(request, response) {
        try {
            await likeService.createLike(request.headers.user, request.params.devId);
            return response
            .json({
                status: 'success',
                ok: true
            });
        } catch (err) {
            return response
            .status(400)
            .json({
                status: 'error',
                message: err
            });
        }
    }
}