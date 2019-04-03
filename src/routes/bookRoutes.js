const express = require('express');

const bookRouter = express.Router();

function router() {
    bookRouter.route('/books')
        .get((req, res) => {
            let responseJson = {hello: "This is my API"};
            res.send(responseJson);
        })


}

module.exports = router;