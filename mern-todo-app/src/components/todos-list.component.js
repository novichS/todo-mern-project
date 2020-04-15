import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
  <tr>
    <td>{props.todo.todo_description}</td>
    <td>{props.todo.todo_responsible}</td>
    <td>{props.todo.todo_priority}</td>
    <td>
      <Link to={'/edit/'+props._id}>Edit</Link>
    </td>
  </tr>
);

export default class TodoList extends Component {

constructor(props) {
  super(props);
  this.state = {todos: []};
}

componentDidMount() {
  axios.get('http://localhost:4000/todos/')
  .then(response => {
    this.setState({ todos: response.data });
  })
  .catch((err) => {
    console.log(err)
  })
};

todoList() {
  return this.state.todos.map((currentTodo, i) => {
    return <Todo todo={currentTodo} key={currentTodo._id} />
  })
};

  render() {
    return (
      <div>
        <p>Todos List!</p>
        <table
        className="table table-stripted"
        style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>
      </div>
    );
  }
}