function formatCurrency(value) {
  return `Rs. ${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function SummaryCards({
  balance,
  income,
  expenses,
}) {
  const cards = [
    {
      title: "Total Balance",
      value: balance,
      className: "balance",
    },
    {
      title: "Total Income",
      value: income,
      className: "income",
    },
    {
      title: "Total Expenses",
      value: expenses,
      className: "expense",
    },
  ];

  return (
    <section className="summary-grid">

      {cards.map((card) => (
        <article
          className={`summary-card ${card.className}`}
          key={card.title}
        >

          <div className="summary-label">
            {card.title}
          </div>

          <div className="summary-value">
            {formatCurrency(card.value)}
          </div>

        </article>
      ))}

    </section>
  );
}

export default SummaryCards;