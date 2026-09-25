function formatCurrency(value) {
  return `Rs. ${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function MonthlySummary({
  totals,
}) {
  return (
    <section className="panel monthly-panel">

      <div className="panel-heading">

        <div>

          <p className="eyebrow">
            THIS MONTH
          </p>

          <h2>
            Monthly Summary
          </h2>

        </div>

      </div>

      <div className="monthly-items">

        <div>
          <span>
            Income
          </span>

          <strong className="income-text">
            {formatCurrency(
              totals.income
            )}
          </strong>
        </div>

        <div>
          <span>
            Expenses
          </span>

          <strong className="expense-text">
            {formatCurrency(
              totals.expenses
            )}
          </strong>
        </div>

        <div>
          <span>
            Balance
          </span>

          <strong>
            {formatCurrency(
              totals.balance
            )}
          </strong>
        </div>

      </div>

    </section>
  );
}

export default MonthlySummary;