import Newsletters from "./Newsletters";
import Announcements from "./Announcements";
import VolunteerEvents from "./VolunteerEvents";

const DashboardAdmin: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-full gap-8">
            {/* Volunteer Events section */}
            <div className="w-[70%] h-full gap-6 ">
                <VolunteerEvents />
            </div>

            {/* Notifications and Newsletter section */}
            <div className="flex flex-col w-[28%] h-full gap-6">
                <div className="flex flex-col flex-1">
                    <Announcements />
                </div>
                <div className="flex flex-col flex-1">
                    <Newsletters />
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;