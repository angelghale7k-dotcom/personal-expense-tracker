import { useState } from "react";

function BudgetCard({
  budget,
  monthlyExpenses,
  onSaveBudget,
}) {
  const [inputValue, setInputValue] =
    useState(String(budget));

  const exceeded =
    budget > 0 &&
    monthlyExpenses > budget;

  const handleSave = (event) => {
    event.preventDefault();

    const newBudget =
      Number(inputValue);

    if (
      Number.isFinite(newBudget) &&
      newBudget >= 0
    ) {
      onSaveBudget(newBudget);
    }
  };

  return (
    <section className="panel budget-panel">

      <div className="panel-heading">

        <div>

          <p className="eyebrow">
            MONTHLY PLAN
          </p>

          <h2>
            Budget Limit
          </h2>

        </div>

      </div>

      <form
        className="budget-form"
        onSubmit={handleSave}
      >

        <input
          type="number"
          min="0"
          step="100"
          value={inputValue}
          onChange={(event) =>
            setInputValue(
              event.target.value
            )
          }
          placeholder="30000"
        />

        <button
          className="secondary-button"
          type="submit"
        >
          Save
        </button>

      </form>

      <p className="budget-status">
        Monthly budget:{" "}
        <strong>
          Rs.{" "}
          {budget.toLocaleString(
            "en-IN"
          )}
        </strong>
      </p>

      {exceeded && (
        <div className="budget-warning">
          Warning: You have exceeded
          your monthly budget.
        </div>
      )}

    </section>
  );
}

export default BudgetCard;