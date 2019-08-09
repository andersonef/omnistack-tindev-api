const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async importDevFromGithub(username) {
        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return userExists;
        }

        const githubResponse = await axios.get('https://api.github.com/users/' + username);
        const {name, bio, avatar_url: avatar} = githubResponse.data;
    
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });
        return dev;
    },

    async getDevsForList(userId) {
        const user = await Dev.findById(userId);
        const list = await Dev.find({
            $and: [
                {_id: { $ne: userId }},
                {_id: { $nin: user.likes }},
                {_id: { $nin: user.dislikes }}
            ]
        });
        return list;
    }
}