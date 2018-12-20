import React, { Component } from 'react';
import './Todo.css';

var apiKey = "6e2ac39490d68d8cee32b36012960fb0a3e39cfec2f17767e25323f7292f60ee";


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: this.props.completed
    }
    this.completeTodo = this.completeTodo.bind(this);
  }


  completeTodo(event) {
    var self = this;
    var todoID = event.target.parentNode.id; //'target' is the actual element the event was called for (i.e. click, button)
    console.log(todoID)
    console.log('completeButton clicked')

    const data = {
      completed: true
    };

    var completeRequest = new XMLHttpRequest();

    completeRequest.onreadystatechange = function() {

      if(this.readyState === 4 && this.status === 200) {

        self.setState({
          completed: true
        });

      }
      else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    }

    completeRequest.open("PUT", "https://api.kraigh.net/todos/" + todoID, true);
    completeRequest.setRequestHeader("Content-type", "application/json");
    completeRequest.setRequestHeader("x-api-key", apiKey);
    //Turning 'data' variable created above to be a string and send it to the server.
    completeRequest.send(JSON.stringify(data));

  }


  render() {

    var completedClass = "todo"

    if (this.state.completed) {
      completedClass = "todo completed";
      var checkbox = <input onClick={this.completeTodo} type="checkbox" className="check" checked="checked" value="" />
    }
    else {
      var checkbox = <input onClick={this.completeTodo} type="checkbox" className="check" value="" />
    }

    return (
      <li id={this.props.id} className={completedClass}>

        {checkbox}
        <span id="todo-text"> {this.props.text} </span>

        <button type="button" className="close" aria-label="Close">
          <span onClick={this.props.deleteTodo} aria-hidden="true">&times;</span>
        </button>

      </li>
    );
  }
}

export default Todo;
