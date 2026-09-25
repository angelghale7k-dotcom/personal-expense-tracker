function formatCurrency(value) {
  return `Rs. ${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function TransactionItem({
  transaction,
  onDelete,
}) {
  const isIncome =
    transaction.type === "income";

  return (
    <article className="transaction-row">

      <div className="transaction-main">

        <div
          className={`transaction-icon ${
            isIncome
              ? "income"
              : "expense"
          }`}
        >
          {isIncome ? "↗" : "↘"}
        </div>

        <div>

          <strong>
            {transaction.description}
          </strong>

          <small>
            {isIncome
              ? "Income"
              : "Expense"}
          </small>

        </div>

      </div>

      <span className="category-pill">
        {transaction.category}
      </span>

      <span className="date-text">

        {new Date(
          `${transaction.date}T00:00:00`
        ).toLocaleDateString(
          "en-NP",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )}

      </span>

      <strong
        className={`amount ${
          isIncome
            ? "income-text"
            : "expense-text"
        }`}
      >
        {isIncome ? "+" : "-"}{" "}
        {formatCurrency(
          transaction.amount
        )}
      </strong>

      <button
        className="delete-button"
        type="button"
        onClick={() =>
          onDelete(transaction.id)
        }
      >
        Delete
      </button>

    </article>
  );
}

export default TransactionItem;