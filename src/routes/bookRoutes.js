const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const { getBooks, getBookById, postBook } = bookController(Book);

function router(Book) {
    bookRouter.route('/Books')
        .get(getBooks)

        .post(postBook)

    bookRouter.route('/books/:bookId')
        .get(getBookById)

    return bookRouter;
}

module.exports = router;