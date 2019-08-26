const httpError = require('../util/httpError');
const jwt = require('jsonwebtoken');
// const userRepository = require('data/userRepository');
const config = require('../config/config');
// const log = require('logger')('auth');
const User = require('../models/user');

module.exports = function authentication(req, res, next) {
    if (!req.headers.authorization) {
        return next();
    }

    if (!config.tokenKey) {
        console.log('Missing JWT secret, unable to decode JWT token.');
        return next(httpError.serviceUnavailable());
    }

    const secret = config.tokenKey;
    const token = req.headers.authorization.split(' ')[1];

    let decoded;

    try {
        decoded = jwt.decode(token, secret, 'HS256');
    } catch (e) {
        next(httpError.unauthorized());
    }

    User.findOne({email:decoded.email})
        .then(function(user) {
            if(user)
            {
                req.user = user;
                return next();
            }else{
                return next(httpError.unauthorized());
            }
        });       
};
