const express = require('express');

//Initializing the express application
const app = express();

//Assigning a port to the server
const port = process.env.PORT || 4000;

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});