const mongoose = require('mongoose');
const shortId = require('shortid');

const Schema = mongoose.Schema;

const userSchema = new Schema({   
    name: String,
    email: String,
    admin: Boolean
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
