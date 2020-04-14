const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 4000;

mongoose.connect('mongodb://127.0.01:27017/todos', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database - ok!");
})

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});