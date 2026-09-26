function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="navbar">

      <div className="nav-inner">

        <div className="brand">

          <div className="brand-icon">
            ET
          </div>

          <span>
            ExpenseTracker
          </span>

        </div>

        <button
          className="theme-button"
          onClick={onToggleTheme}
        >
          {theme === "light"
            ? "🌙 Dark"
            : "☀️ Light"}
        </button>

      </div>

    </header>
  );
}

export default Navbar;