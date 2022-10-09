"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("@/controllers/userController"));
const bookController_1 = __importDefault(require("@/controllers/bookController"));
const users_validator_1 = __importDefault(require("@/validator/users.validator"));
const router = express_1.default.Router();
const userController = new userController_1.default();
const bookController = new bookController_1.default();
/* GET users listing. */
router
    .get('/:id', users_validator_1.default.getUserValidator, userController.getUser)
    .get('/', userController.getUsers)
    .post('/', users_validator_1.default.createUserValidator, userController.createUser)
    .post('/:userId/borrow/:bookId', users_validator_1.default.borrowBookValidator, bookController.borrowBook)
    .post('/:userId/return/:bookId', users_validator_1.default.returnBookValidator, bookController.returnBook);
exports.default = router;
