const express = require('express');
//const bookController = require('../controllers/bookController');

function router(Book) {
    const bookRouter = express.Router();

    //const { getBooks, getBookById, postBook, getBooksByGenre } = bookController(Book);
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

    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('book not found');
            }
        });
    });
    bookRouter.route('/:bookId')
        .get((req, res) => {
            res.json(req.book);
        })

        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.book);
                }
            });
            res.json(req.book);
        })

        .patch((req, res) => {
            if (req.body._id) {
                delete (req.body._id);
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(req.book);
                }
            });
        })

        .delete((req, res) => {
            req.book.remove((err) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(204).send("Removed");
                }
            });
        })


    bookRouter.use('/:genre', (req, res, next) => {
        Book.find(req.params.genre, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else if (book) {
                req.book = book;
                next();
            }
            else {
                res.status(404).send('book not found');
            }
        });
    });
    bookRouter.route('/:genre')
        .get((req, res) => {
            res.json(req.book);
        })

    return bookRouter;
}

module.exports = router;