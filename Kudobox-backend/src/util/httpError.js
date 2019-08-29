/**
 * Created by lander on 13/11/15.
 */

'use strict';

const Boom = require('@hapi/boom');

exports.badRequest = function(data) {
    const err = Boom.badRequest('One or more validation failed', data);
    err.output.payload.details = err.data;
    return err;
};

exports.notFound = function() {
    return Boom.notFound('The resource is not found');
};
exports.notFound = function(user) {
    return Boom.notFound(`The user with email ${user} is not found`);
};
exports.methodNotAllowed = function(message, data) {
    return Boom.methodNotAllowed(message, data);
};

exports.forbidden = function(message, data) {
    return Boom.forbidden(message, data);
};

exports.notImplemented = function(message, data) {
    return Boom.notImplemented(message, data);
};

exports.unauthorized = function(scheme, attributes) {
    return Boom.unauthorized(null, scheme, attributes);
};

exports.serviceUnavailable = function(message, data) {
    return Boom.serverTimeout(message, data);
};

exports.unsupportedMediaType = function(data) {
    return Boom.unsupportedMediaType('Media type not supported.', data);
};
