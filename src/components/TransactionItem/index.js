import './index.css'

const deleteIconUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/delete.png'

const TransactionItem = props => {
  const {eachTransactionDetails, updateListAfterDeleting} = props
  const {id, title, amount, type} = eachTransactionDetails
  const onClickingDeleteButton = () => {
    updateListAfterDeleting(id, type, amount)
  }
  return (
    <li className="transaction-item-container">
      <p className="transaction-item">{title}</p>
      <p className="transaction-item">{amount}</p>
      <p className="transaction-item">{type}</p>
      <button
        type="button"
        className="delete-button"
        onClick={onClickingDeleteButton}
        testid="delete"
      >
        <img src={deleteIconUrl} className="delete-icon" alt="delete" />
      </button>
    </li>
  )
}

export default TransactionItem
