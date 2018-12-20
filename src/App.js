import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apiKey = "6e2ac39490d68d8cee32b36012960fb0a3e39cfec2f17767e25323f7292f60ee";

class App extends Component {

  constructor(props) {
    super(props)
    // stuff here
    this.state = {
      todos: [],
      input: ' '
    }
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.sortTodo = this.sortTodo.bind(this);
  }


  addTodo(event) {
    console.log('addTodo');
    event.preventDefault();
    //Do Ajax
    var self = this;

    const data = {
      text: self.state.input
    }

    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {

        const newTodo = JSON.parse(this.responseText)
        self.setState({
          todos: [...self.state.todos, newTodo]
        });
        /* clear the input field */
        self.setState({input: ''});
      }
      else {
        console.log(this.responseText);
      }
    }

    createRequest.open("POST", "https://api.kraigh.net/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apiKey);
    createRequest.send(JSON.stringify(data));
  }



  onChange(event) {
    this.setState({
      input: event.target.value
    });
  }



  deleteTodo(event) {
    var todoID = event.currentTarget.parentNode.parentNode.id;
    console.log("The ID: " + todoID + " has been deleted.")
    var self = this;

    //API call, DELETE to remove
    var deleteRequest = new XMLHttpRequest();

    deleteRequest.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
          if (todo.id !== todoID) {
            return todo;
          }
        });
        self.setState({todos: remainingTodos});

      }
      else if (this.readyState === 4) {
        console.log('delete Fail...')
        console.log(this.responseText);
      }
    }

    deleteRequest.open("DELETE", "https://api.kraigh.net/todos/" + todoID, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();

  }



  //Load existing todos
  componentDidMount() {
    const self = this;

    var listRequest = new XMLHttpRequest();
    listRequest.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {

        var todos = JSON.parse(this.responseText);
        self.setState({todos: todos});

      }
      else if(this.readyState === 4) {
        console.log(this.responseText);
      }

    }
    listRequest.open("GET", "https://api.kraigh.net/todos", true);
    listRequest.setRequestHeader("x-api-key", apiKey);
    listRequest.send();

  }

  sortTodo(event) {

    var self = this;

    const sortedTodos = self.state.todos.sort(function (a,b) {
      return parseFloat(b.created) - parseFloat(a.created);
    });

    self.setState({todos: sortedTodos})
  }


  render() {

    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="header">
            <div className="text-header">
              <h1 className="text-center" id="title">My To-Do List</h1>
                <p className="lead text-center" id="second-text">Do not procrastinate. Ever</p>
                <button onClick={this.sortTodo} id="sortBtn" type="button" class="btn btn-info"> Sort by created date </button>
            </div>

            <div className="container">


              <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />

              <div className="todos">
                <ul className="list-unstyled">

                  {this.state.todos.map((todo) =>
                    <Todo key={todo.id} id={todo.id} completed={todo.completed}
                      text={todo.text} deleteTodo={this.deleteTodo}/>
                  )}

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default App;
