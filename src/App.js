import React, { Component } from 'react';
import Task from './Task';
import './App.css';

class App extends Component {
  state = {
    inputText : '',
    list : [
      {id: 0, text: 'Add some more tasks to this list', time:'Mon May 28 2018 16:12:25 GMT-0500 (CDT)' }
    ],
    completed : [
      {id: 0, text: 'Trash completed tasks', time:'Mon May 28 2018 16:12:25 GMT-0500 (CDT)' }
    ]
  }
  handleChange = this.handleChange.bind(this);
  handleChange(e){
    this.setState({inputText : e.target.value});
  }
  addTask(e){
    e.preventDefault();
    if(this.state.inputText){
      const newTask = {
        text: this.state.inputText,
        id: this.state.list.length + 1,
        time: new Date()
      }
      const updatedList = this.state.list;
      updatedList.push(newTask);
      this.setState({ list : updatedList, inputText : '' });
    }
  }
  renderTasks(){
    return this.state.list.map((task, index) => {
        return (
            <Task text={task.text}
                key={index}
                id={task.id}
                time={task.time}
                icon="fas fa-check"
                markComplete={(id) => this.markTaskComplete(id)}
            />
        )
    })
  }
  renderCompleteTasks(){
    return this.state.completed.map((task, index) => {
        return (
            <Task text={task.text}
                key={index}
                id={task.id}
                time={task.time}
                icon="fas fa-trash"
                markComplete={(id) => this.deleteComplete(id)}
            />
        )
    })
  }
  markTaskComplete(id){
    const updatedList = this.state.list;
    const updatedCompletedList = this.state.completed;
    for(let x = 0; x < updatedList.length; x++){
      if(updatedList[x].id == id){
        const completedToDo = updatedList.splice(x, 1);
        updatedCompletedList.push(completedToDo[0]);
        this.setState({ list : updatedList, completed : updatedCompletedList });
      }
    }
  }
  deleteComplete(id){
    console.log('delete complete');
    const updatedCompletedList = this.state.completed;
    for(let x = 0; x < updatedCompletedList.length; x++){
      if(updatedCompletedList[x].id == id){
        const completedToDo = updatedCompletedList.splice(x, 1);
        this.setState({ completed : updatedCompletedList });
      }
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <div>
          <h2><i className="far fa-list-alt"></i> ToDo List <small>Made with React</small></h2>
          </div>
        </header>
        <div id="container">
          <div id="add-to-list" className="chunk">
            <form onSubmit={ (e)=> this.addTask(e)}>
              <input type="text" placeholder="What do you need to do?" value={this.state.inputText} onChange={this.handleChange}/>
              <input type="submit" value="Add ToDo" />
            </form>
          </div>
          <div className="chunk">
            <h3>Things To Do</h3>
            <ul>{ this.renderTasks() }</ul>
          </div>
          <div id="completed-list" className="chunk">
            <h3>Completed Tasks</h3>
            <ul>{ this.renderCompleteTasks() }</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
