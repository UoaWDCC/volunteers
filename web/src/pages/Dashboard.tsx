import { useState } from "react";
import DashboardCommunity from "../components/DashboardCommunity";
import DashboardProfile from "@components/DashboardProfile";
import DashboardDashboard from "@components/DashboardDashboard";
import DashboardDiscover from "@components/DashboardDiscover";

function Dashboard() {
    const [tab, setTab] = useState(1);

    const switchDashboard = () => {
        setTab(1);
    };

    const switchDiscover = () => {
        setTab(2);
    };

    const switchProfile = () => {
        setTab(3);
    };

    const switchCalendar = () => {
        setTab(4);
    };

    const switchCommunity = () => {
        setTab(5);
    };

    return (
        <div className="bg-[#F7F7FB] primary-background overflow-hidden flex flex-row">
            {/* width of the left nav bar */}
            {/* place thing component here and remove bg-primary */}
            <div className='bg-primary w-[15%] h-auto'> 
                <h1>side thing test</h1>
                <button onClick={switchDashboard}>dashboard</button>
                <button onClick={switchDiscover}>discover</button>
                <button onClick={switchProfile}>profile</button>
                <button onClick={switchCalendar}>calendar</button>
                <button onClick={switchCommunity}>community</button>
            </div>

            {/* width of the everything else (other than the left nav bar) or in otherwords the length of the searchbar*/}
            <div className='flex flex-col w-[85%] marker:p-5'>
                <div className='bg-yellow-100'>
                    {/* place searchbar component here and remove bg-yellow */}
                    <h1>header</h1>
                </div>

                {/* whole tabs go in here */}
                <div className='flex flex-row'>
                    {/* <DashboardCommunity /> */}
                    {tab === 1 && <DashboardDashboard />}
                    {tab === 2 && <DashboardDiscover />}
                    {tab === 3 && <DashboardProfile />}
                    {tab === 4 && <h1>Calendar</h1>}
                    {tab === 5 && <DashboardCommunity />}
                </div>
            </div>
            
        </div>
  );
}

export default Dashboard;