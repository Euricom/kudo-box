const mongoose = require('mongoose');
const shortId = require('shortid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        default: shortId.generate,
    },
    name: String,
    email: String,
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
