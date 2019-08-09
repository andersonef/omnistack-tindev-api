const DevService = require('../services/DevService');

module.exports = {

    async index(request, response) {
        try {
            const devList = await DevService.getDevsForList(request.headers.user).catch(e => {
                console.log('Erro ao gerar a lista: ', e);
                throw e;
            });

            return response.json({
                status: 'success',
                data: devList
            });
        } catch (err) {
            return response
            .status(400)
            .json({
                status: 'error',
                message: err
            });
        }
    },

    async store(request, response) {
        try {
            const newDev = await DevService.importDevFromGithub(request.body.username).catch(e => {
                console.log('deu erro: ', e);
                throw e;
            });
            return response.json({
                status: 'success',
                data: newDev
            });
        } catch(err) {
            return response
            .status(400)
            .json({
                status: 'error',
                message: err
            });
        }
    }
}