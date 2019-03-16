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

    console.log("todoList", todoList)
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      taskCount: 0
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World!</h1>
        <p>Task Count: {this.state.taskCount}</p>
      </div>
    );
  }
}

export default App;
