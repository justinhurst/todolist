import React, { Component } from 'react';
import Task from './Task';
import './App.css';

class App extends Component {
  state = {
    inputText : '',
    list : [
      {id: 1000, text: 'Add a task to this list', time:'Mon May 28 2018 16:12:25 GMT-0500 (CDT)' }
    ],
    completed : [
      {id: 35060, text: 'Remove completed tasks', time:'Mon May 28 2018 16:12:25 GMT-0500 (CDT)' }
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
        id: Math.floor(Math.random() * 9999999),
        time: new Date()
      }
      const updatedList = this.state.list;
      updatedList.push(newTask);
      this.setState({ list : updatedList, inputText : '' });
    }
  }
  renderTasks(){
    if( this.state.list.length > 0){
      return this.state.list.map((task, index) => {
        return (
            <Task text={task.text}
                key={index}
                id={task.id}
                time={task.time}
                icon="fas fa-check"
                markComplete={(id) => this.markTaskComplete(id)}
                moveTaskUp={(id) => this.moveTaskUp('list',id)}
                moveTaskDown={(id) => this.moveTaskDown('list',id)}
                deleteTask={(id) => this.deleteTask('list',id)}
            />
        )
      })
    } else {
      return <li className="default">You have <i>absolutely</i> nothing to do. Add some tasks to this list</li>
    }
  }
  renderCompleteTasks(){
    if( this.state.completed.length > 0 ){
      return this.state.completed.map((task, index) => {
        return (
            <Task text={task.text}
                key={index}
                id={task.id}
                time={task.time}
                icon="far fa-trash-alt"
                markComplete={(id) => this.deleteComplete(id)}
                moveTaskUp={(id) => this.moveTaskUp('completed',id)}
                moveTaskDown={(id) => this.moveTaskDown('completed',id)}
                deleteTask={(id) => this.deleteTask('completed',id)}
            />
        )
      })
    } else {
      return <li className="default">There's nothing here...</li>
    }
  }
  markTaskComplete(id){
    const updatedCompletedList = this.state.completed;
    const taskMarkedComplete = this.state.list.filter((task,index)=>{
      if(task.id == id) {
        updatedCompletedList.push(task);
      }
      return task.id !== id
    })
    this.setState({list: taskMarkedComplete, completed: updatedCompletedList});
  }
  deleteComplete(id){
    console.log(id);
    const deletedTask = this.state.completed.filter((task,index)=>{
      return task.id !== id
    })
    this.setState({completed: deletedTask});
  }
  deleteTask(whichList,id){
    console.log(whichList,id);
    const deletedTask = this.state[whichList].filter((task,index)=>{
      return task.id !== id
    })
    if(whichList == 'completed'){
      this.setState({completed: deletedTask});
    } else {
      this.setState({list: deletedTask});
    }
    
  }
  moveTaskUp(whichList,id){
    //need to combine moveTaskUp and moveTaskDown DRY
    const movedTask = this.state[whichList];
    let index = undefined;
    for(let x = 0; x < movedTask.length; x++){
      if(movedTask[x].id == id){
        index = x;
      }
    }
    const removed = movedTask.splice(index,1);
    movedTask.splice(index-1,0,removed[0])
    if(whichList == 'completed'){
      this.setState({completed: movedTask});
    } else {
      this.setState({list: movedTask});
    }
  }
  moveTaskDown(whichList,id){
    //need to combine moveTaskUp and moveTaskDown DRY
    const movedTask = this.state[whichList];
    let index = undefined;
    for(let x = 0; x < movedTask.length; x++){
      if(movedTask[x].id == id){
        index = x;
      }
    }
    const removed = movedTask.splice(index,1);
    movedTask.splice(index+1,0,removed[0])
    if(whichList == 'completed'){
      this.setState({completed: movedTask});
    } else {
      this.setState({list: movedTask});
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <div>
          <h2><i className="far fa-list-alt"></i> TASKLIST <small>Made with React</small></h2>
          </div>
        </header>
        <div id="container">
          <div id="add-to-list" className="">
            <form onSubmit={ (e)=> this.addTask(e)}>
              <input type="text" placeholder="What do you need to do?" value={this.state.inputText} onChange={this.handleChange}/>
              <input type="submit" value="Add Task" />
            </form>
          </div>
          <div className="chunk">
            <h3>Things To Do</h3>
            <ul id="todo-list">{ this.renderTasks() }</ul>
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
