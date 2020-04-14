const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const port = 4000;

let Todo = require('./models/todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.01:27017/todos', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database - ok!");
})

todoRoutes.route('/').get((req, res) => {
    Todo.find((err, todos) => {
        err ? console.log(err) : res.json(todos);
    });
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added - ok'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(!todo) {
            res.status(404).send('todo not found');
        }
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Updated');
        })
        .catch(err => {
            res.status(400).send('Error');
        });
    });
});

app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});