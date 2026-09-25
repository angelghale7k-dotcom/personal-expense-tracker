import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import FilterBar from "./components/FilterBar";
import ExpenseChart from "./components/ExpenseChart";
import MonthlySummary from "./components/MonthlySummary";
import BudgetCard from "./components/BudgetCard";

const STORAGE_KEY = "personal-expense-tracker-transactions";
const BUDGET_KEY = "personal-expense-tracker-budget";
const THEME_KEY = "personal-expense-tracker-theme";

function readTransactions() {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);

    if (!savedTransactions) {
      return [];
    }

    const parsedTransactions = JSON.parse(savedTransactions);

    return Array.isArray(parsedTransactions) ? parsedTransactions : [];
  } catch {
    return [];
  }
}

function readBudget() {
  try {
    const savedBudget = localStorage.getItem(BUDGET_KEY);
    const parsedBudget = Number(savedBudget);

    return Number.isFinite(parsedBudget) && parsedBudget >= 0
      ? parsedBudget
      : 30000;
  } catch {
    return 30000;
  }
}

function App() {
  const [transactions, setTransactions] = useState(readTransactions);
  const [budget, setBudget] = useState(readBudget);

  const [filterCategory, setFilterCategory] = useState("All");

  const [sortOrder, setSortOrder] = useState("newest");

  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "light"
  );

  // Save transactions whenever transactions change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Save budget
  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, String(budget));
  }, [budget]);

  // Save theme
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Add transaction
  const addTransaction = (transactionData) => {
    const newTransaction = {
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,

      ...transactionData,

      amount: Number(transactionData.amount),
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
  };

  // Delete transaction
  const deleteTransaction = (transactionId) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId
      )
    );
  };

  // Calculate income, expenses and balance
  const totals = useMemo(() => {
    return transactions.reduce(
      (summary, transaction) => {
        if (transaction.type === "income") {
          summary.income += transaction.amount;
        } else {
          summary.expenses += transaction.amount;
        }

        summary.balance =
          summary.income - summary.expenses;

        return summary;
      },
      {
        income: 0,
        expenses: 0,
        balance: 0,
      }
    );
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    const filtered =
      filterCategory === "All"
        ? [...transactions]
        : transactions.filter(
            (transaction) =>
              transaction.category === filterCategory
          );

    filtered.sort((a, b) => {
      const firstDate = new Date(a.date).getTime();
      const secondDate = new Date(b.date).getTime();

      return sortOrder === "newest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });

    return filtered;
  }, [
    transactions,
    filterCategory,
    sortOrder,
  ]);

  // Current month transactions
  const monthlyTransactions = useMemo(() => {
    const currentMonth =
      new Date().toISOString().slice(0, 7);

    return transactions.filter((transaction) =>
      transaction.date.startsWith(currentMonth)
    );
  }, [transactions]);

  // Current month totals
  const monthlyTotals = useMemo(() => {
    return monthlyTransactions.reduce(
      (summary, transaction) => {
        if (transaction.type === "income") {
          summary.income += transaction.amount;
        } else {
          summary.expenses += transaction.amount;
        }

        summary.balance =
          summary.income - summary.expenses;

        return summary;
      },
      {
        income: 0,
        expenses: 0,
        balance: 0,
      }
    );
  }, [monthlyTransactions]);

  const setMonthlyBudget = (newBudget) => {
    setBudget(Number(newBudget));
  };

  return (
    <div className="app">

      <Navbar
        theme={theme}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "light"
              ? "dark"
              : "light"
          )
        }
      />

      <main className="container">

        {/* Hero */}
        <section className="hero">

          <div>
            <p className="eyebrow">
              PERSONAL FINANCE DASHBOARD
            </p>

            <h1>
              Personal Expense Tracker
            </h1>

            <p className="subtitle">
              Record your income and expenses,
              understand your spending, and keep
              your monthly finances organized.
            </p>
          </div>

        </section>

        {/* Summary */}
        <SummaryCards
          balance={totals.balance}
          income={totals.income}
          expenses={totals.expenses}
        />

        {/* Main Dashboard */}
        <section className="dashboard-grid">

          {/* Left */}
          <TransactionForm
            onAddTransaction={addTransaction}
          />

          {/* Right */}
          <div className="side-column">

            <ExpenseChart
              transactions={transactions}
            />

            <MonthlySummary
              totals={monthlyTotals}
            />

            <BudgetCard
              budget={budget}
              monthlyExpenses={
                monthlyTotals.expenses
              }
              onSaveBudget={
                setMonthlyBudget
              }
            />

          </div>

        </section>

        {/* Transaction History */}
        <section className="history-section">

          <div className="section-heading">

            <div>
              <p className="eyebrow">
                ACTIVITY
              </p>

              <h2>
                Transaction History
              </h2>
            </div>

            <span className="transaction-count">
              {filteredTransactions.length} transaction
              {filteredTransactions.length !== 1
                ? "s"
                : ""}
            </span>

          </div>

          <FilterBar
            selectedCategory={
              filterCategory
            }
            sortOrder={sortOrder}
            onCategoryChange={
              setFilterCategory
            }
            onSortChange={
              setSortOrder
            }
          />

          <TransactionList
            transactions={
              filteredTransactions
            }
            onDelete={
              deleteTransaction
            }
          />

        </section>

      </main>

      <footer className="footer">
        Personal Expense Tracker • Built with React
      </footer>

    </div>
  );
}

export default App;