import "../styles/componentStyles/Header.css";
import { handleGoogle } from "../../services/firebase.tsx";

import clubLogo from "../assets/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header-content">

        <div className="header-left">
          <img src={clubLogo} alt="Volunteers Club Logo" />
        </div>

        <div className="header-right">
          <ul className="links">
            <li onClick={ handleGoogle } className="button">Sign in</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;