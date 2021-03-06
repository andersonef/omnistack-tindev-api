const Dev = require('../models/Dev');
const likeService = require('../services/LikeService');

module.exports = {
    async store(request, response) {
        try {
            const dev = await likeService.createLike(request.headers.user, request.params.devId);
            return response
            .json({
                status: 'success',
                data: dev
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