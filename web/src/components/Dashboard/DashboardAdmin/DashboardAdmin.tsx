import Newsletters from "./Newsletters";
import Announcements from "./Announcements";

const DashboardAdmin: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-full gap-5">
            {/* Volunteer Events section */}
            <div className="w-[75%]">

            </div>

            {/* Notifications and Newsletter section */}
            <div className="flex flex-col w-[22%] gap-8">
                <Announcements />
                <Newsletters />
            </div>
        </div>
    );
}

export default DashboardAdmin;
