const express = require('express');
//Initializing the express application
const app = express();
const mongoose = require('mongoose');
//Assigning a port to the server
const port = process.env.PORT || 4000;

const bookRouter = express.Router();

bookRouter.route('/Books')
    .get((req, res) => {
        let responseJson = {hello: "This is my api"};
        res.json(responseJson);
    })

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
