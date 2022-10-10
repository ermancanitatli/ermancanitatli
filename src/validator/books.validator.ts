import Joi from 'joi';
import {NextFunction, Request, Response} from "express";
import {body, validationResult} from 'express-validator'
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
    createValidator, ExpressJoiInstance
} from 'express-joi-validation'

const validator = createValidator()

export default class BooksValidator {


    public static createBookValidator(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            name: Joi.string().required().max(100).min(1)
        })

        validator.body(schema, {joi: {convert: true}})(req, res, next)


    }

    public static getBookValidator(req: Request, res: Response, next: NextFunction): void {

        const schema = Joi.object({
            id: Joi.number().required()
        })

        validator.params(schema, {joi: {convert: true}})(req, res, next)

    }


}