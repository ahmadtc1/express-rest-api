const express = require('express');


function router(Book) {
    const bookRouter = express.Router();
    bookRouter.route('/Books')
        .get((req, res) => {
            let responseJson = { hello: "This is my api" };
            var query = {};
            //Ensuring that the user is not just sending in a random query
            if (req.query.genre || req.query.author || req.query.title) {
                query.genre = req.query.genre;
                query.title = req.query.title;
                query.author = req.query.author;
            }
            Book.find(query, (err, books) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            })

        })

        .post((req, res) => {
            let book = new Book(req.body);
            book.save();

            console.log(book);
            res.status(201).send(book);
        })

    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(book);
                }
            })
        })
    return bookRouter;
}

module.exports = router;