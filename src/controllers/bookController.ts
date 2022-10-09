//#region Imports
import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import createError from "http-errors";

const prisma = new PrismaClient()
//#endregion

//#region BookController
export default class bookController {


    /** get all books data */
    public async getBooks(req: Request, res: Response) {

        const books = await prisma.books.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        res.status(200).send(books)

    }


    /** get specific book data */
    public async getBook(req: Request, res: Response) {

        const book = await prisma.books.findUnique({
            where: {
                id: +req.params?.id
            },
            select: {
                id: true,
                name: true,
            }
        })

        const scoreAvg = await prisma.userBooks.aggregate({
            where: {
                bookId: +req.params?.id,
            },
            _avg: {
                userScore: true
            }

        })


        if (!book) {
            res.status(404).send('book not found')
        }

        res.status(200).send({...book, score: scoreAvg._avg?.userScore || -1})

    }


    /** create book */
    public async createBook(req: Request, res: Response) {

        await prisma.books.create({
            data: {
                name: req.body.name
            }
        })

        res.status(200).send()

    }


    /** borrow book */
    public async borrowBook(req: Request, res: Response) {

        const userId = req.params.userId;
        const bookId = req.params.bookId;

        const book = await prisma.books.findUnique({
            where: {
                id: +bookId
            }
        })

        // check if book is available
        if (book) {

            const userBook = await prisma.userBooks.findFirst({
                where: {
                    bookId: +bookId,
                    deliveryStatus: 'BORROWED'
                }
            })

            // check if book is already borrowed
            if (!userBook) {

                await prisma.userBooks.create({
                    data: {
                        userId: +userId,
                        bookId: +bookId,
                        deliveryStatus: 'BORROWED',
                    }
                })

                res.status(200).send()

            } else {

                res.status(400).send('book already borrowed')

            }

        } else {

            res.status(404).send('book not found')

        }

    }


    /** return book */
    public async returnBook(req: Request, res: Response) {

        const userId = req.params.userId;
        const bookId = req.params.bookId;

        const userBook = await prisma.userBooks.findFirst({
            where: {
                bookId: +bookId,
                userId: +userId,
                deliveryStatus: 'BORROWED'
            }
        })

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
            })

            res.status(200).send()

        } else {

            res.status(400).send('book not borrowed')

        }

    }

}
//#endregion