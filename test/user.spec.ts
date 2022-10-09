import chai from "chai";
import axios from "axios";
import "../bin/www";

describe("USER-SPEC", () => {

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

        it("Should return '200' if POST /user", async () => {
            return axios.post('http://localhost:3000/users', {
                name: "erman"
            }).then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

        it("Should return '200' if POST /users/:userId/borrow/:bookId", async () => {
            return axios.post('http://localhost:3000/users/1/borrow/4').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

        it("Should return '200' if POST /users/:userId/return/:bookId", async () => {
            return axios.post('http://localhost:3000/users/1/return/4', {
                score: 5
            }).then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

    });

});