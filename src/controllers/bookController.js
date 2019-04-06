function bookController(Book) {

    //Method for retrieving all books from the database
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

    //Method for retrieving a book by its ID
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

    //Method for retrieving books of specific genre
    function getBooksByGenre(req, res) {
        let query = {genre: req.params.genre };
        Book.find(query, (err, books) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(books);
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