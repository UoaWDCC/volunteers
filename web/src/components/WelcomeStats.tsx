// WelcomeStats
import "../styles/componentStyles/WelcomeStats.css";
import { Link } from "react-router-dom";

function WelcomeStats() {
  // future fetch data from the server. (User, Hours, Shifts, etc.)
  // =========== TEMPORARY: hard code data ===========
  const Data = {
    User: "[placeholder]",
    Hours: 40,
    Shifts: 5,
  };

  const { User, Hours, Shifts } = Data;
  // =========== TEMPORARY: hard code data ===========

  return (
    <div className="hour-counter">
      <div className="welcome-message">
        <h1 className="heading1">
          Welcome Back, <span className="user-on-new-line">{User}!</span>
        </h1>
        <h3 className="heading3">Glad to see you're back in action!</h3>
        <Link className="see-more" to="/">
          See More
        </Link>
      </div>

      <div className="my-stats">
        <div className="hours">
          <h2>{Hours}</h2>
          <p>Hours</p>
        </div>
        <div className="shifts">
          <h2>{Shifts}</h2>
          <p>Shifts</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeStats;
