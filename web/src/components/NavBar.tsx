// NavBar.js
import '../styles/componentStyles/NavBar.css';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <h1 className="site-title">Temp NavBar</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
