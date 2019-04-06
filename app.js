const express = require('express');
//Initializing the express application
const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/bookAPI');

const Book = require('./models/bookModel');

//Assigning a port to the server
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter = require('./src/routes/bookRoutes')(Book);

app.use('/api', bookRouter);





app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
