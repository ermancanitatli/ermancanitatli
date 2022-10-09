"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFormatter = exports.usersFormatter = void 0;
/** users data formatter */
function usersFormatter(users) {
    for (let i = 0; i < users.length; i++) {
        let past = [];
        let present = [];
        for (const book of users[i].books) {
            book.name = book.book.name;
            delete book.book;
            if (book.deliveryStatus === 'DELIVERED') {
                delete book.deliveryStatus;
                past.push(book);
            }
            else {
                delete book.deliveryStatus;
                present.push(book);
            }
        }
        users[i].books = {
            past,
            present
        };
    }
    return users;
}
exports.usersFormatter = usersFormatter;
/** user data formatter */
function userFormatter(user) {
    try {
        let past = [];
        let present = [];
        console.log(user);
        for (const book of user.books) {
            book.name = book.book.name;
            delete book.book;
            if (book.deliveryStatus === 'DELIVERED') {
                delete book.deliveryStatus;
                past.push(book);
            }
            else {
                delete book.deliveryStatus;
                present.push(book);
            }
        }
        user.books = {
            past,
            present
        };
        return user;
    }
    catch (e) {
        throw Error(e);
    }
}
exports.userFormatter = userFormatter;
