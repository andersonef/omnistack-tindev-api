const Dev = require('../models/Dev');
const dislikeService = require('../services/DislikeService');

module.exports = {
    async store(request, response) {
        try {
            const dev = await dislikeService.createDislike(request.headers.user, request.params.devId);
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