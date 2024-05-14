import SideBar from "@components/SideBar";
import WelcomeStats from "@components/WelcomeStats";
import Discover from "@components/Discover";
import UpcomingEvents from "@components/UpcomingEvents";
import BellButton from "@components/BellButton";
import "../styles/pageStyles/Dashboard.css";

const Dashboard = () => {
    let content = <BellButton/>;
    return (
        <div className="Dashboard-Div">
            <SideBar/>
            <div>
                {content}
                <WelcomeStats/>
                <Discover/>
            </div>     
            <UpcomingEvents/>
        </div>
    );
}

export default Dashboard;