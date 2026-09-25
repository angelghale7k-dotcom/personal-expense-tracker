const categories = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Education",
  "Health",
  "Salary",
  "Other",
];

function FilterBar({
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
}) {
  return (
    <div className="filter-bar">

      <label>

        Category

        <select
          value={selectedCategory}
          onChange={(event) =>
            onCategoryChange(
              event.target.value
            )
          }
        >

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

      <label>

        Sort by date

        <select
          value={sortOrder}
          onChange={(event) =>
            onSortChange(
              event.target.value
            )
          }
        >

          <option value="newest">
            Newest first
          </option>

          <option value="oldest">
            Oldest first
          </option>

        </select>

      </label>

    </div>
  );
}

export default FilterBar;