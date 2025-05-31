import Newsletters from "./Newsletters";
import Announcements from "./Announcements";
import VolunteerEvents from "./VolunteerEvents";

const DashboardAdmin: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-[88vh] gap-10 p-8">
            {/* Volunteer Events section */}
            <div className="w-[70%] h-full gap-8 ">
                <VolunteerEvents />
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