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
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]});
    console.log("accounts", accounts[0])
    //Fetch account
  }

  constructor(props) {
    super(props);
    this.state = { account: '' }
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World!</h1>
        <p>Your account: {this.state.account}</p>
      </div>
    );
  }
}

export default App;
