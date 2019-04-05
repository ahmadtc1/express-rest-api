const express = require('express');
//Initializing the express application
const app = express();

const mongoose = require('mongoose');

//Assigning a port to the server
const port = process.env.PORT || 4000;

const bookRouter = express.Router();


const db = mongoose.connect('mongodb://localhost/bookAPI');
const book = require('./models/bookModel');

bookRouter.route('/Books')
    .get((req, res) => {
        let responseJson = { hello: "This is my api" };
        var query = {};
        //Ensuring that the user is not just sending in a random query
        if (req.query.genre || req.query.author || req.query.title) {
            query.genre = req.query.genre;
            query.title = req.query.title;
            query.author = req.query.author;
            book.find(query, (err, books) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.json(books);
                }
            })
        }
    })

bookRouter.route('/books/:bookId')
    .get((req, res) => {
        book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(book);
            }
        })
    })

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
