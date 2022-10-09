import {NextFunction, Request, Response} from "express";
import {getLogger} from "@/utils/loggers";

export function requestLogger(req: Request, res: Response, next: NextFunction) {

    switch (req.url) {
        case '/users':
            if (req.method === 'GET') {
                getLogger("REQUEST").info('Get all users');
            }
            if (req.method === 'POST') {
                getLogger("REQUEST").info('Create user');
            }
            if (req.method === 'PUT') {
                getLogger("REQUEST").info('Update user');
            }
            if (req.method === 'DELETE') {
                getLogger("REQUEST").info('Delete user');
            }
            break;
        case '/books':
            if (req.method === 'GET') {
                getLogger("REQUEST").info('Get all books');
            }
            if (req.method === 'POST') {
                getLogger("REQUEST").info('Create book');
            }
            if (req.method === 'PUT') {
                getLogger("REQUEST").info('Update book');
            }
            if (req.method === 'DELETE') {
                getLogger("REQUEST").info('Delete book');
            }
    }

    next();
}