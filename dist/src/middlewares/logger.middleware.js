"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const loggers_1 = require("@/utils/loggers");
function requestLogger(req, res, next) {
    switch (req.url) {
        case '/users':
            if (req.method === 'GET') {
                (0, loggers_1.getLogger)("REQUEST").info('Get all users');
            }
            if (req.method === 'POST') {
                (0, loggers_1.getLogger)("REQUEST").info('Create user');
            }
            if (req.method === 'PUT') {
                (0, loggers_1.getLogger)("REQUEST").info('Update user');
            }
            if (req.method === 'DELETE') {
                (0, loggers_1.getLogger)("REQUEST").info('Delete user');
            }
            break;
        case '/books':
            if (req.method === 'GET') {
                (0, loggers_1.getLogger)("REQUEST").info('Get all books');
            }
            if (req.method === 'POST') {
                (0, loggers_1.getLogger)("REQUEST").info('Create book');
            }
            if (req.method === 'PUT') {
                (0, loggers_1.getLogger)("REQUEST").info('Update book');
            }
            if (req.method === 'DELETE') {
                (0, loggers_1.getLogger)("REQUEST").info('Delete book');
            }
    }
    next();
}
exports.requestLogger = requestLogger;
