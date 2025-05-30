import Newsletters from "./Newsletters";
import Notifications from "./Notifications";
import VolunteerEvents from "./VolunteerEvents";

const DashboardAdmin: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-full gap-5">
            {/* Volunteer Events section */}
            <div className="w-[75%]">
                <VolunteerEvents />
            </div>

            {/* Notifications and Newsletter section */}
            <div className="flex flex-col w-[20%] gap-8">
                <Notifications />
                <Newsletters />
            </div>
        </div>
    );
}

export default DashboardAdmin;