import React, { Component } from 'react';

class TodoList extends Component {

  render() {
    return (
      <div id="content">
        <form>
          <input id="newTask" type="text" className="form-control" placeholder="Add task..." required/>
          <input type="submit" hidden=""/>
        </form>
        <ul id="taskList" className="list-unstyled">
          {this.props.tasks.map((task,key) => { // for every task in state, render this div
            return(                             // task = object in array, key = index of object
              <div className="taskTemplate" className="checkbox" key={key}>
                <label>
                  <input type="checkbox" />
                  <span className="content">{task.content}</span>
                </label>
              </div>
            )
          })}
        </ul>
        <ul id="completedTaskList" className="list-unstyled">
        </ul>
      </div>
    );
  }
}

export default TodoList;
