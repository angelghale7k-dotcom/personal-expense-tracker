import TransactionItem from "./TransactionItem";

function TransactionList({
  transactions,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          📊
        </div>

        <h3>
          No matching transactions
        </h3>

        <p>
          No transactions yet. Add your
          first transaction to get started.
        </p>

      </div>
    );
  }

  return (
    <div className="transaction-list">

      <div className="transaction-header">

        <span>
          Transaction
        </span>

        <span>
          Category
        </span>

        <span>
          Date
        </span>

        <span>
          Amount
        </span>

        <span></span>

      </div>

      {transactions.map(
        (transaction) => (
          <TransactionItem
            transaction={
              transaction
            }
            onDelete={
              onDelete
            }
            key={
              transaction.id
            }
          />
        )
      )}

    </div>
  );
}

export default TransactionList;