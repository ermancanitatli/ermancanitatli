"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const formatter_1 = require("@/utils/formatter");
const prisma = new client_1.PrismaClient();
//#endregion
//#region UserController
class userController {
    /** get specific user data */
    async getUser(req, res, next) {
        const user = await prisma.user.findUnique({
            where: {
                id: +req.params?.id
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
        });
        if (!user) {
            res.status(404).send('user not found');
        }
        res.status(200).send((0, formatter_1.userFormatter)(user));
    }
    /** get all users data */
    async getUsers(req, res, next) {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            }
        });
        res.status(200).send(users);
    }
    /** create new user */
    async createUser(req, res) {
        await prisma.user.create({
            data: {
                name: req.body.name
            }
        });
        res.status(200).send();
    }
}
exports.default = userController;
//#endregion
