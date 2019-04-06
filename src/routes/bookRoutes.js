const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');

function router(Book) {
    const { getBooks, getBookById, postBook } = bookController(Book);

    bookRouter.route('/Books')
        .get(getBooks)

        .post(postBook)

    bookRouter.route('/books/:bookId')
        .get(getBookById)

    bookRouter.route('/books/:genre')
        .get(getBooksByGenre)
    return bookRouter;
}

module.exports = router;