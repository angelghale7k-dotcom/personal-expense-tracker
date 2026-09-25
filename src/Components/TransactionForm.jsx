import { useState } from "react";

const incomeCategories = [
  "Salary",
  "Freelance",
  "Allowance",
  "Other Income",
];

const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Health",
  "Other",
];

function TransactionForm({
  onAddTransaction,
}) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date()
      .toISOString()
      .slice(0, 10),
  });

  const [error, setError] = useState("");

  const categories =
    formData.type === "income"
      ? incomeCategories
      : expenseCategories;

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,

      [name]: value,

      ...(name === "type"
        ? {
            category: "",
          }
        : {}),
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(
      formData.amount
    );

    if (
      !formData.amount ||
      amount <= 0
    ) {
      setError(
        "Please enter an amount greater than zero."
      );
      return;
    }

    if (!formData.category) {
      setError(
        "Please select a category."
      );
      return;
    }

    if (
      !formData.description.trim()
    ) {
      setError(
        "Please enter a description."
      );
      return;
    }

    if (!formData.date) {
      setError(
        "Please select a date."
      );
      return;
    }

    onAddTransaction({
      ...formData,

      description:
        formData.description.trim(),
    });

    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: new Date()
        .toISOString()
        .slice(0, 10),
    });

    setError("");
  };

  return (
    <section className="panel form-panel">

      <div className="panel-heading">

        <div>

          <p className="eyebrow">
            NEW ENTRY
          </p>

          <h2>
            Add Transaction
          </h2>

        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Type */}
        <div className="type-toggle">

          <button
            type="button"
            className={
              formData.type === "expense"
                ? "active"
                : ""
            }
            onClick={() =>
              setFormData(
                (current) => ({
                  ...current,
                  type: "expense",
                  category: "",
                })
              )
            }
          >
            Expense
          </button>

          <button
            type="button"
            className={
              formData.type === "income"
                ? "active"
                : ""
            }
            onClick={() =>
              setFormData(
                (current) => ({
                  ...current,
                  type: "income",
                  category: "",
                })
              )
            }
          >
            Income
          </button>

        </div>

        {/* Amount */}
        <label>

          Amount (Rs.)

          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            placeholder="e.g. 1500"
            value={formData.amount}
            onChange={handleChange}
          />

        </label>

        {/* Category */}
        <label>

          Category

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >

            <option value="">
              Select category
            </option>

            {categories.map(
              (category) => (
                <option
                  value={category}
                  key={category}
                >
                  {category}
                </option>
              )
            )}

          </select>

        </label>

        {/* Description */}
        <label>

          Description

          <input
            type="text"
            name="description"
            placeholder="e.g. Lunch with friends"
            value={
              formData.description
            }
            onChange={handleChange}
            maxLength="80"
          />

        </label>

        {/* Date */}
        <label>

          Date

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

        </label>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          className="primary-button"
          type="submit"
        >
          + Add Transaction
        </button>

      </form>

    </section>
  );
}

export default TransactionForm;