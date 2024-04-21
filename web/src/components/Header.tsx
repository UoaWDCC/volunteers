import "../styles/componentStyles/Header.css"

function Header() {
  return (
    <header className="header">
      <div className="header-content">

        <div className="header-left">
          <img src="/src/assets/header-logo.svg" alt="Volunteers Club Logo" />
        </div>

        <div className="header-right">
          <ul className="links">
            <li className="button">Sign in</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;