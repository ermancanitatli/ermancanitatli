import express from 'express';
import {getLogger} from '@/utils/loggers';
import _userController from "@/controllers/userController";
import _bookController from "@/controllers/bookController";
import UsersValidator from "@/validator/users.validator";

const router = express.Router();

const userController = new _userController();
const bookController = new _bookController();


/* GET users listing. */
router
    .get('/:id', UsersValidator.getUserValidator, userController.getUser)
    .get('/', userController.getUsers)
    .post('/', UsersValidator.createUserValidator, userController.createUser)
    .post('/:userId/borrow/:bookId', UsersValidator.borrowBookValidator, bookController.borrowBook)
    .post('/:userId/return/:bookId', UsersValidator.returnBookValidator, bookController.returnBook)

export default router;
