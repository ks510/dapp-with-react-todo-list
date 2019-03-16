import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    // use provider from Meta mask or default
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    //Fetch account and store it in state
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ todoList })
    const taskCount = await todoList.methods.taskCount().call()
    this.setState({ taskCount })
    // getting each task from tasks mapping
    for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }
    console.log("tasks", this.state.tasks);

    console.log("todoList", todoList)
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      taskCount: 0,
      tasks: []
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Dapp University | Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
              <div id="content">
                <form>
                  <input id="newTask" type="text" className="form-control" placeholder="Add task..." required/>
                  <input type="submit" hidden=""/>
                </form>
                <ul id="taskList" className="list-unstyled">
                {this.state.tasks.map((task,key) => { // for every task in state, render this div
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
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
