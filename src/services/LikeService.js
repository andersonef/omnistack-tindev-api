const Dev = require('../models/Dev');

module.exports = {
    loggedDev: null,
    targetDev: null,

    async createLike(loggedDevId, targetDevId) {
        
        await this.readDevsFromDatabase(loggedDevId, targetDevId);
        
        this.validateInput();

        try {
            this.verifyMatch();
            this.loggedDev.likes.push(this.targetDev._id);
            await this.loggedDev.save();
            return true;
        } catch (err) {
            console.log('An error ocour when user tried to like another one. Details: ', err);
            throw "Ops! The operation could not be complete! Sorry!";
        }

    },

    verifyMatch() {
        if (this.targetDev.likes.includes(this.loggedDev._id)) {
            // TODO: Is it a match? yes... 
        }
    },

    validateInput() {
        if (this.loggedDev._id == this.targetDev._id) throw "You can't like yourself!";
        if (this.loggedDev.likes.includes(this.targetDev._id)) throw "You already liked this dev.";
    },

    async readDevsFromDatabase(loggedDevId, targetDevId) {
        this.loggedDev = await Dev.findOne({_id: loggedDevId}).catch(err => {
            console.log('Logged dev not found');
            throw "Logged dev not found.";
        });

        this.targetDev = await Dev.findOne({ _id: targetDevId }).catch(err => {
            console.log('Target dev not found');
            throw "Target dev not found.";
        });
    }
};