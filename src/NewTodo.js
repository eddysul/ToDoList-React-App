import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {


  render() {
    return (
      <div className="row" id="form">
        <form onSubmit={this.props.addTodo} id="new-todo-form">
          <input value={this.props.input} onChange={this.props.onChange} id="newTitle" type="text" className="form-control" autoComplete="off" placeholder="I need to..."></input>
          <button onClick = {this.props.addTodo} id="add-button" type="submit" className="btn btn-primary btn-sm">Add</button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
