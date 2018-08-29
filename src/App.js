import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    inputText : '',
    list : ['Walk the Dog', 'Clean the kitchen', 'Get Groceries'],
    completed : ['Get project for work completed', 'Finish coding homework for class']
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
                <div className="item-utilites">
                  <button onClick={ ()=> this.markComplete(index) }><i class="fas fa-check"></i></button>
                  <button><i class="fas fa-chevron-up"></i></button>
                  <button><i class="fas fa-chevron-down"></i></button>
                </div>
                { item }
                
              </li>
    });
    const completedList = this.state.completed.map((item, index) => {
      return <li 
                className="cf"
                key={ index.toString() } 
                id={ index }>
                <div className="item-utilites">
                <button onClick={ ()=> this.deleteComplete(index) }><i class="far fa-trash-alt"></i></button>
                  <button><i class="fas fa-chevron-up"></i></button>
                  <button><i class="fas fa-chevron-down"></i></button>
                </div>
                { item }
              </li>
    });
    return (
      <div className="App">
        <header>
          <div>
          <h2><i class="far fa-list-alt"></i> ToDo List <small>Made with React</small></h2>
          </div>
        </header>
        <div id="container">
          <div id="add-to-list" className="chunk">
            <form onSubmit={ (e)=> this.addToDo(e)}>
              <input type="text" placeholder="What do you need to do?" value={this.state.inputText} onChange={this.handleChange}/>
              <input type="submit" value="Add ToDo" />
            </form>
          </div>
          <div className="chunk">
            <h3>Things To Do</h3>
            <ul>{toDoList}</ul>
          </div>
          <div id="completed-list" className="chunk">
            <ul>{completedList}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
