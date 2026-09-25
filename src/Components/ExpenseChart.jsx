import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ExpenseChart({
  transactions,
}) {
  const expensesByCategory =
    transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (categories, transaction) => {
          categories[
            transaction.category
          ] =
            (categories[
              transaction.category
            ] || 0) +
            transaction.amount;

          return categories;
        },
        {}
      );

  const chartData =
    Object.entries(
      expensesByCategory
    ).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

  return (
    <section className="panel chart-panel">

      <div className="panel-heading">

        <div>

          <p className="eyebrow">
            SPENDING
          </p>

          <h2>
            Expenses by Category
          </h2>

        </div>

      </div>

      {chartData.length === 0 ? (

        <div className="small-empty">
          Add an expense to see your
          chart.
        </div>

      ) : (

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height={260}
          >

            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="category"
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `Rs. ${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`,
                  "Spent",
                ]}
              />

              <Bar
                dataKey="amount"
                radius={[
                  6,
                  6,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      )}

    </section>
  );
}

export default ExpenseChart;