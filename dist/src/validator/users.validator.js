"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const validator = (0, express_joi_validation_1.createValidator)();
class UsersValidator {
    static createUserValidator(req, res, next) {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required().max(50).min(1)
        });
        validator.body(schema, { joi: { convert: true } })(req, res, next);
    }
    static getUserValidator(req, res, next) {
        const schema = joi_1.default.object({
            id: joi_1.default.number().required().max(50).min(1)
        });
        validator.params(schema, { joi: { convert: true } })(req, res, next);
    }
    static borrowBookValidator(req, res, next) {
        const schema = joi_1.default.object({
            userId: joi_1.default.number().required(),
            bookId: joi_1.default.number().required()
        });
        validator.params(schema, { joi: { convert: true } })(req, res, next);
    }
    static returnBookValidator(req, res, next) {
        const schema = joi_1.default.object({
            userId: joi_1.default.number().required(),
            bookId: joi_1.default.number().required()
        });
        const bodySchema = joi_1.default.object({
            score: joi_1.default.number().required().max(10).min(0)
        });
        validator.body(bodySchema, { joi: { convert: true } })(req, res, next);
    }
}
exports.default = UsersValidator;
