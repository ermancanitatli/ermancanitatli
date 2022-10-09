import Joi from 'joi';
import {NextFunction, Request, Response} from "express";
import {
    createValidator
} from 'express-joi-validation'

const validator = createValidator()

export default class UsersValidator {


    public static createUserValidator(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            name: Joi.string().required()
        })

        validator.body(schema, {joi: {convert: true}})(req, res, next)


    }

    public static getUserValidator(req: Request, res: Response, next: NextFunction): void {

        const schema = Joi.object({
            id: Joi.number().required()
        })

        validator.params(schema, {joi: {convert: true}})(req, res, next)

    }

    public static borrowBookValidator(req: Request, res: Response, next: NextFunction): void {

        const schema = Joi.object({
            userId: Joi.number().required(),
            bookId: Joi.number().required()
        })

        validator.params(schema, {joi: {convert: true}})(req, res, next)

    }

    public static returnBookValidator(req: Request, res: Response, next: NextFunction): void {

        const schema = Joi.object({
            userId: Joi.number().required(),
            bookId: Joi.number().required()
        })

        validator.params(schema, {joi: {convert: true}})(req, res, next)

    }


}