

function bookController(Book) {

    function getBooks(req, res) {
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

    }

    function getBooksById(req, res) {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(book);
            }
        })
    }

    function postBook(req, res) {
        let book = new Book(req.body);
        book.save();

        console.log(book);
        res.status(201).send(book);
    }

}

module.exports = bookController;