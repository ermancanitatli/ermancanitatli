/** users data formatter */
export function usersFormatter(users: any) {

    for (let i = 0; i < users.length; i++) {
        let past = []
        let present = []
        for (const book of users[i].books) {

            book.name = book.book.name
            delete book.book

            if (book.deliveryStatus === 'DELIVERED') {
                delete book.deliveryStatus
                past.push(book)
            } else {
                delete book.deliveryStatus
                present.push(book)
            }

        }
        users[i].books = {
            past,
            present
        }

    }

    return users

}

/** user data formatter */
export function userFormatter(user: any) {

    try {
        let past = []
        let present = []

        console.log(user)
        for (const book of user.books) {

            book.name = book.book.name
            delete book.book

            if (book.deliveryStatus === 'DELIVERED') {
                delete book.deliveryStatus
                past.push(book)
            } else {
                delete book.deliveryStatus
                present.push(book)
            }

        }
        user.books = {
            past,
            present
        }

        return user
    } catch (e: any) {
        throw Error(e)
    }

}