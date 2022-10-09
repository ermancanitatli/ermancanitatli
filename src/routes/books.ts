import express from 'express';
import {getLogger} from '@/utils/loggers';
import _bookController from "@/controllers/bookController";
import BooksValidator from "@/validator/books.validator";

const router = express.Router();

const bookController = new _bookController();


/* GET books listing. */
router.get('/:id', BooksValidator.getBookValidator, bookController.getBook)
    .get('/', bookController.getBooks)
    .post('/', BooksValidator.createBookValidator, bookController.createBook)

export default router;
