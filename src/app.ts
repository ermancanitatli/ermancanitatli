import createError from 'http-errors';

import express, {RequestHandler, ErrorRequestHandler} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import booksRouter from './routes/books';
import {requestLogger} from "@/middlewares/logger.middleware";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.errorHandler();
        this.config();
        this.routerSetup();

    }

    private config() {
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(requestLogger);

    }

    private routerSetup() {
        this.app.use('/', indexRouter);
        this.app.use('/users', usersRouter);
        this.app.use('/books', booksRouter);
    }


    private errorHandler() {
        // catch 404 and forward to error handler
        const requestHandler: RequestHandler = function (req, res, next) {
            next()
        };
        this.app.use(requestHandler);

        // error handler
        const errorRequestHandler: ErrorRequestHandler = function (
            err,
            req,
            res,
            _next
        ) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        };

        this.app.use(errorRequestHandler);

    }
}

export default new App().app;

