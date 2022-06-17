import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    currentList: [],
    titleInput: '',
    amountInput: '',
    typeInput: 'Income',
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({typeInput: event.target.value})
  }

  onSubmittingTheFormDetails = event => {
    event.preventDefault()
    const {
      titleInput,
      amountInput,
      typeInput,
      balance,
      income,
      expenses,
    } = this.state
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: typeInput,
    }
    if (
      newTransaction.title !== '' &&
      newTransaction.amount !== '' &&
      newTransaction.type !== ''
    ) {
      this.setState(prevState => ({
        currentList: [...prevState.currentList, newTransaction],
        titleInput: '',
        amountInput: '',
      }))
    }

    if (typeInput === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amountInput),
        balance: prevState.balance + parseInt(amountInput),
      }))
    } else if (typeInput === 'Expenses') {
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amountInput),
        expenses: prevState.expenses + parseInt(amountInput),
      }))
    }
  }

  updateListAfterDeleting = (id, type, amount) => {
    const {currentList, balance, income, expenses} = this.state
    const filteredList = currentList.filter(eachItem => eachItem.id !== id)
    this.setState({currentList: filteredList})
    if (type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(amount),
        balance: prevState.balance - parseInt(amount),
      }))
    } else if (type === 'Expenses') {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amount),
        expenses: prevState.expenses - parseInt(amount),
      }))
    }
  }

  render() {
    const {
      currentList,
      titleInput,
      amountInput,
      typeInput,
      balance,
      income,
      expenses,
    } = this.state

    return (
      <div className="main-container">
        <div className="welcome-container">
          <h1 className="name">Hi, Joel </h1>
          <p className="message">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <div className="all-money-details-container">
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </div>
        <div className="transaction-history-container">
          <div className="transaction-container">
            <h1 className="transaction-heading">Add Transaction</h1>
            <form onSubmit={this.onSubmittingTheFormDetails}>
              <div className="input-container">
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  className="input"
                  id="title"
                  placeholder="TITLE"
                  onChange={this.onChangeTitleInput}
                  value={titleInput}
                />
              </div>
              <div className="input-container">
                <label htmlFor="amount">AMOUNT</label>
                <input
                  type="text"
                  className="input"
                  id="amount"
                  placeholder="AMOUNT"
                  onChange={this.onChangeAmountInput}
                  value={amountInput}
                />
              </div>
              <div className="input-container">
                <label htmlFor="type">TYPE</label>
                <select
                  id="type"
                  className="input"
                  onChange={this.onChangeTypeInput}
                  value={typeInput}
                >
                  {transactionTypeOptions.map(eachType => (
                    <option testid={eachType.optionId}>
                      {eachType.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="history-heading">History</h1>
            <ul className="history-table-container">
              <div className="history-table-heading-box">
                <div className="each-history-item">
                  <p className="transaction-item-heading">Title</p>
                  <p className="transaction-item-heading">Amount</p>
                  <p className="transaction-item-heading">Type</p>
                </div>
              </div>
              {currentList.map(eachItem => (
                <TransactionItem
                  eachTransactionDetails={eachItem}
                  updateListAfterDeleting={this.updateListAfterDeleting}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
