import {Component} from 'react'
import './index.css'

const balanceImgUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
const incomeImgUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
const expensesImgUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

class MoneyDetails extends Component {
  render() {
    const {balance, income, expenses} = this.props

    return (
      <div className="money-details-container">
        <div className="balance-container">
          <img src={balanceImgUrl} className="image" alt="balance" />
          <div>
            <p className="amount-text">Your Balance</p>
            <p className="amount" testid="balanceAmount">
              Rs {balance}
            </p>
          </div>
        </div>
        <div className="income-container">
          <img src={incomeImgUrl} className="image" alt="income" />
          <div>
            <p className="amount-text">Your Income</p>
            <p className="amount" testid="incomeAmount">
              Rs {income}
            </p>
          </div>
        </div>
        <div className="expenses-container">
          <img src={expensesImgUrl} className="image" alt="expenses" />
          <div>
            <p className="amount-text">Your Expenses</p>
            <p className="amount" testid="expensesAmount">
              Rs {expenses}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyDetails
