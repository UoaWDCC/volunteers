import '../styles/componentStyles/Footer.css';

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-content">
        <div id ="footer-section" className="footer-section-left">
          <img src="\public\assets\Volunteers-logo-footer.jpg" alt="Volunteers Club Logo" className="footer-logo" />
          <p className = "copyright">© 2020 University of Auckland Volunteers Club</p>
        </div>
        
        <div id = "footer-section" className="footer-section-right">
          <div className="footer-section-right-content">
            <h3 className = "community">Community</h3>
            <ul className ="footer-socials">
              <li><a href="#" className="footer-link">Instagram</a></li>
              <li className = "footer-socials-item"><a href="#" className="footer-link">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
