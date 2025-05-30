import Notifications from "./Notifications";
import VolunteerEvents from "./VolunteerEvents";

const DashboardAdmin: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-[88vh] gap-8">
            {/* Volunteer Events section */}
            <div className="w-[70%] h-full gap-8">
                <VolunteerEvents />
            </div>

            {/* Notifications and Newsletter section */}
            <div className="flex flex-col w-[25%] h-full gap-8">
                <Notifications />
            </div>
        </div>
    );
}

export default DashboardAdmin;