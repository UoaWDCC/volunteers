import SideBar from "@components/SideBar";
import WelcomeStats from "@components/WelcomeStats";
import Discover from "@components/Discover";
import UpcomingEvents from "@components/UpcomingEvents";

const Dashboard = () => {
    return (
        <div>
            <div className="dashboard">
                <SideBar/>
            </div>
            <div>
                <WelcomeStats/>
                <Discover/>
                <UpcomingEvents/>
            </div>
        </div>
    );
}

export default Dashboard;