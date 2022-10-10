"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Imports
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//#endregion
//#region BookController
class bookController {
    /** get all books data */
    async getBooks(req, res) {
        const books = await prisma.books.findMany({
            select: {
                id: true,
                name: true,
            }
        });
        res.status(200).send(books);
    }
    /** get specific book data */
    async getBook(req, res) {
        const book = await prisma.books.findUnique({
            where: {
                id: +req.params?.id
            },
            select: {
                id: true,
                name: true,
            }
        });
        const scoreAvg = await prisma.userBooks.aggregate({
            where: {
                bookId: +req.params?.id,
            },
            _avg: {
                userScore: true
            }
        });
        if (!book) {
            res.status(404).send('book not found');
        }
        res.status(200).send({ ...book, score: scoreAvg._avg?.userScore || -1 });
    }
    /** create book */
    async createBook(req, res) {
        await prisma.books.create({
            data: {
                name: req.body.name
            }
        });
        res.status(200).send();
    }
    /** borrow book */
    async borrowBook(req, res) {
        const { userId, bookId } = req.params;
        const user = await prisma.user.findUnique({
            where: {
                id: +userId
            }
        });
        console.log(user);
        if (!user) {
            res.status(404).send('user not found');
        }
        const book = await prisma.books.findUnique({
            where: {
                id: +bookId
            }
        });
        // check if book is available
        if (book) {
            const userBook = await prisma.userBooks.findFirst({
                where: {
                    bookId: +bookId,
                    deliveryStatus: 'BORROWED'
                }
            });
            // check if book is already borrowed
            if (!userBook) {
                await prisma.userBooks.create({
                    data: {
                        userId: +userId,
                        bookId: +bookId,
                        deliveryStatus: 'BORROWED',
                    }
                });
                res.status(200).send();
            }
            else {
                res.status(400).send('book already borrowed');
            }
        }
        else {
            res.status(404).send('book not found');
        }
    }
    /** return book */
    async returnBook(req, res) {
        const userId = req.params.userId;
        const bookId = req.params.bookId;
        const user = await prisma.user.findUnique({
            where: {
                id: +userId
            }
        });
        if (!user) {
            res.status(400).send('user not found');
        }
        const userBook = await prisma.userBooks.findFirst({
            where: {
                bookId: +bookId,
                userId: +userId,
                deliveryStatus: 'BORROWED'
            }
        });
        // check if book is borrowed
        if (userBook) {
            await prisma.userBooks.updateMany({
                where: {
                    userId: +userId,
                    bookId: +bookId,
                },
                data: {
                    deliveryStatus: 'DELIVERED',
                    userScore: req.body.score,
                    deliveryDate: new Date(),
                }
            });
            res.status(200).send();
        }
        else {
            res.status(400).send('book not borrowed');
        }
    }
}
exports.default = bookController;
//#endregion
