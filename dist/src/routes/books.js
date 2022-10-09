"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("@/controllers/bookController"));
const books_validator_1 = __importDefault(require("@/validator/books.validator"));
const router = express_1.default.Router();
const bookController = new bookController_1.default();
/* GET books listing. */
router.get('/:id', books_validator_1.default.getBookValidator, bookController.getBook)
    .get('/', bookController.getBooks)
    .post('/', books_validator_1.default.createBookValidator, bookController.createBook);
exports.default = router;
