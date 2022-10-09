import chai from "chai";
import axios from "axios";
import "../bin/www";

describe("BOOK-SPEC", () => {

    describe('books', () => {

        it("Should return '200' if GET /book", async () => {
            return axios.get('http://localhost:3000/books').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

        it("Should return '200' if GET /book/:id", async () => {
            return axios.get('http://localhost:3000/books/2').then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

        it("Should return '200' if POST /book", async () => {
            return axios.post('http://localhost:3000/books', {
                name: "examplename"
            }).then((response) => {
                chai.expect(response.status).to.equal(200);
            })
        });

    });

});