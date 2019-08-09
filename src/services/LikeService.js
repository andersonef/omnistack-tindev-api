const Dev = require('../models/Dev');

module.exports = {
    loggedDev: null,
    targetDev: null,

    async createLike(loggedDevId, targetDevId) {
        
        this.validateInput(loggedDevId, targetDevId);

        try {
            if (this.targetDev.likes.includes(this.loggedDev._id)) {
                // TODO: Is it a match? yes... 
            }
            this.loggedDev.likes.push(this.targetDev._id);
            await this.loggedDev.save();
        } catch (err) {
            console.log('An error ocour when user tried to like another one. Details: ', err);
            throw "Ops! The operation could not be complete! Sorry!";
        }

    },

    async validateInput(loggedDevId, targetDevId) {

        if (loggedDevId == targetDevId) throw "You can't like yourself!";

        this.loggedDev = await Dev.findOne({_id: loggedDevId}).catch(err => {
            console.log('Logged dev not found');
        });
        if (!this.loggedDev) throw "Logged dev not found!";

        this.targetDev = await Dev.findOne({ _id: targetDevId }).catch(err => {
            console.log('Target dev not found');
        });
        if (!this.targetDev) throw "Target dev not found!";

        if (this.loggedDev.likes.includes(this.targetDev._id)) throw "You already liked this dev.";
    }
};