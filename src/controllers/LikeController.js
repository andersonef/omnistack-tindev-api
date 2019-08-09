const Dev = require('../models/Dev');
const likeService = require('../services/LikeService');

module.exports = {
    async store(request, response) {


        try {
            likeService.createLike(request.headers.user, request.params.devId);
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
                message: e
            });
        }
        
        const { user: idDevLoggedIn } = request.headers;
        const { devId: idTargetDev } = request.params;

        if (idDevLoggedIn === idTargetDev) {
            return response
            .status(400)
            .json({
                status: 'error',
                message: 'You can not like yourself!'
            });
        }

        const devLoggedIn = await Dev.findOne({_id: idDevLoggedIn}).catch(err => {
            console.log('Logged dev not found');
        });

        if (!devLoggedIn) {
            return response
            .status(400)
            .json( {
                status: 'error',
                message: 'Logged dev not found'
            });
        }
        
        const devTarget = await Dev.findOne({_id: idTargetDev}).catch( err => {
            console.log('Target dev not found');
        });

        if (!devTarget) {
            return response
            .status(400)
            .json( {
                status: 'error',
                message: 'Target dev not found'
            })
        }

        if (devLoggedIn.likes.includes(devTarget._id)) {
            return response
            .status(400)
            .json({
                status: 'error',
                message: 'You already liked this dev!'
            })
        }
    
        try {
            
            if (devTarget.likes.includes(devLoggedIn._id)) {
                // TODO: Is this a match?
            }

            devLoggedIn.likes.push(idTargetDev);
            devLoggedIn.save();
        } catch (e) {
            return response
            .status(400)
            .json({
                status: 'error',
                message: e
            });
        }
        return response.json({
            status: 'success',
            data: true
        });
    }
}