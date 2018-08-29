import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    inputText : '',
    list : [],
    completed : []
  }
  handleChange = this.handleChange.bind(this);

  handleChange(e){
    this.setState({inputText : e.target.value});
  }
  addToDo(e){
    e.preventDefault();
    console.log('adding item', e);
    const updatedList = this.state.list;
    updatedList.push(this.state.inputText);
    this.setState({ list : updatedList, inputText : '' });
  }
  markComplete(listIndex){
    console.log(listIndex, 'marking this complete');
    const updatedList = this.state.list;
    const updatedCompletedList = this.state.completed;
    const completedToDo = updatedList.splice(listIndex, 1);
    updatedCompletedList.push(completedToDo);
    this.setState({ list : updatedList, completed : updatedCompletedList });
  }
  deleteComplete(completedIndex){
    console.log(completedIndex, 'deleteing from completed items');
  }
  render() {
    const toDoList = this.state.list.map((item, index) => {
      return <li 
                key={ index.toString() } 
                id={ index }>
                { item }
                <button onClick={ ()=> this.markComplete(index) }>Mark Complete</button>
              </li>
    });
    const completedList = this.state.completed.map((item, index) => {
      return <li 
                key={ index.toString() } 
                id={ index }>
                { item }
                <button onClick={ ()=> this.deleteComplete(index) }>Delete</button>
              </li>
    });
    return (
      <div className="App">
        <header>
          <h2>ToDo List</h2>
        </header>
        <div className="chunk">
          <form onSubmit={ (e)=> this.addToDo(e)}>
            <input type="text" placeholder="What do you need to do?" value={this.state.inputText} onChange={this.handleChange}/>
            <input type="submit" value="Add ToDo" />
          </form>
        </div>
        <div className="chunk">
          <h3>Things To Do</h3>
          <ul>{toDoList}</ul>
        </div>
        <div className="chunk">
          <h3>Completed Things</h3>
          <ul>{completedList}</ul>
        </div>
      </div>
    );
  }
}

export default App;
