// WelcomeStats
import "../styles/componentStyles/Discover.css";
import DiscoverCard from "./DiscoverCard";
function Discover() {
  return (
  <div className="discovery-container">
     <div className = "div1">
      <div className="LeftContent">
        <h1 className="Discover">Discover</h1>
      </div>
      <div className="rightContent">
        <button className="view-all">View all</button>
      </div>
    </div>
    <div className="div2">
        <DiscoverCard/>
        <DiscoverCard/>
        <DiscoverCard/>
    </div>
  </div>
  );
}

export default Discover;
