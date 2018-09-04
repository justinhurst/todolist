import React, { Component } from 'react';
import './App.css';

class Task extends Component {
    render() {
        return (
            <li className="cf">
              <div className="item-action">
                <button onClick={ ()=> this.props.markComplete(this.props.id) }><i className={this.props.icon}></i></button>
              </div>
              <span>{ this.props.text }</span>
              <div className="item-utilities">
              <button onClick={ ()=> this.props.moveTaskUp(this.props.id) }><i className="fas fa-arrow-up"></i></button>
              <button onClick={ ()=> this.props.deleteTask(this.props.id) }><i className="far fa-trash-alt"></i></button>
              <button onClick={ ()=> this.props.moveTaskDown(this.props.id) }><i className="fas fa-arrow-down"></i></button>
              </div>
            </li>
        );
    }
}


export default Task;
