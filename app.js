const express = require('express');
//Initializing the express application
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');

//Assigning a port to the server
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const bookRouter = express.Router();

app.use('/api', bookRouter);

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
        }
        book.find(query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
            }
        })

    })

    .post((req, res) => {
        let book = new book(req.body);

        console.log(book);
        res.send(book);
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


app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
