import chai from "chai";
import axios from "axios";
import "../bin/www";
import Jabber from 'jabber';

const jabber = new Jabber();

describe("CREATE", () => {

    describe('create-user', () => {

        it("Should return '200' if POST /user", async () => {
            return axios.post('http://localhost:3000/users', {
                name: jabber.createFullName()
            }).then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

    })

    describe('create-book', () => {

        it("Should return '200' if POST /book", async () => {
            return axios.post('http://localhost:3000/books', {
                name: jabber.createWord(10)
            }).then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

    })

})


describe("GET-USER", () => {

    describe('users', () => {

        it("Should return '200' if GET /users", async () => {
            return axios.get('http://localhost:3000/users').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });


        it("Should return '200' if GET /users/:id", async () => {
            return axios.get('http://localhost:3000/users/1').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });


        it("Should return '200' if POST /users/:userId/borrow/:bookId", async () => {
            return axios.post('http://localhost:3000/users/1/borrow/1').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

        it("Should return '200' if POST /users/:userId/return/:bookId", async () => {
            return axios.post('http://localhost:3000/users/1/return/1', {
                score: 5
            }).then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

    });

});

describe("GET-BOOK", () => {

    describe('books', () => {

        it("Should return '200' if GET /book", async () => {
            return axios.get('http://localhost:3000/books').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

        it("Should return '200' if GET /book/:id", async () => {
            return axios.get('http://localhost:3000/books/1').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });


    });

});