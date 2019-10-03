'use strict'
import React from 'react'
import logo from '../images/ANZSI_logo_active.png'
import SearchTransactions from './SearchTransactions/SearchTransactions'
import TransactionsList from './TransactionsList/TransactionsList'
import {
  readCSVFile,
  getTransactionsWithAcctId,
  calculateBalance
} from '../common/utils'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allTransactions: [],
      transactionList: [],
      calculatedBalance: 0.0,
      showSpinner: false
    }
    this.searchTransactionsInfo = this.searchTransactionsInfo.bind(this)
    this.fetchedData = this.fetchedData.bind(this)
  }

  fetchedData (results) {
    let trList = results.data
    trList.shift()
    this.setState({ allTransactions: trList })
  }

  componentDidMount () {
    readCSVFile(this.fetchedData)
  }

  searchTransactionsInfo (accountId, stateDate, endDate) {
    this.setState({ calculatedBalance: 0.0 })
    this.setState({ transactionList: [] })
    this.setState({ showSpinner: true })
    let filteredTransactions = getTransactionsWithAcctId(
      this.state.allTransactions,
      accountId,
      stateDate,
      endDate
    )
    let balance =
      filteredTransactions.length > 0
        ? calculateBalance(filteredTransactions)
        : 0
    setTimeout(() => {
      this.setState({ calculatedBalance: balance })
      this.setState({ transactionList: filteredTransactions })
      this.setState({ showSpinner: false })
    }, 100)
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2 className='header-text'>Financial Transactions</h2>
        </div>
        <div className='app-container'>
          <SearchTransactions
            searchTransactionsInfo={this.searchTransactionsInfo}
          />
          {this.state.transactionList.length > 0 ? (
            <h5 className='tr-balance'>
              Relative Balance: {this.state.calculatedBalance} <br />
              Number of transactions: {this.state.transactionList.length}
            </h5>
          ) : null}
          <TransactionsList
            transactionList={this.state.transactionList}
            showSpinner={this.state.showSpinner}
          />
        </div>
      </div>
    )
  }
}

export default App
