"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const validator = (0, express_joi_validation_1.createValidator)();
class BooksValidator {
    static createBookValidator(req, res, next) {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required()
        });
        validator.body(schema, { joi: { convert: true } })(req, res, next);
    }
    static getBookValidator(req, res, next) {
        const schema = joi_1.default.object({
            id: joi_1.default.number().required()
        });
        validator.params(schema, { joi: { convert: true } })(req, res, next);
    }
}
exports.default = BooksValidator;
