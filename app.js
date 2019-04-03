const express = require('express');

//Initializing the express application
const app = express();

//Assigning a port to the server
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("Server is running!");
})

app.listen(port, () => {
    console.log('Server running');
});