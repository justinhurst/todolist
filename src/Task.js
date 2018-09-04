import React, { Component } from 'react';
import './App.css';

class Task extends Component {
    render() {
        return (
            <li>
              <div className="item-utilites">
                <button onClick={ ()=> this.props.markComplete(this.props.id) }><i className={this.props.icon}></i></button>
              </div>
              { this.props.text }
            </li>
        );
    }
}


export default Task;
