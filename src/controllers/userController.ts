//#region Imports
import {NextFunction, Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import {userFormatter} from "@/utils/formatter";
import createError from 'http-errors'

const prisma = new PrismaClient()

//#endregion


//#region UserController
export default class userController {


    /** get specific user data */
    public async getUser(req: Request, res: Response, next: NextFunction) {

        const userId = req.params?.id

        const user = await prisma.user.findUnique({
            where: {
                id: +userId
            },
            select: {
                id: true,
                name: true,
                books: {
                    select: {
                        userScore: true,
                        deliveryStatus: true,
                        book: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
            }
        })

        if (!user) {
            res.status(404).send('user not found')
        }

        res.status(200).send(userFormatter(user))

    }


    /** get all users data */
    public async getUsers(req: Request, res: Response, next: NextFunction) {

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,

            }
        })

        res.status(200).send(users)

    }


    /** create new user */
    public async createUser(req: Request, res: Response) {

        await prisma.user.create({
            data: {
                name: "aaa"
            }
        } as any)

        res.status(200).send()

    }

}
//#endregion