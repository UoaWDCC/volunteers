import Notifications from "./Notifications";

const DashboardAdmin: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-full gap-5">
            {/* Volunteer Events section */}
            <div className="w-[75%]">

            </div>

            {/* Notifications and Newsletter section */}
            <div className="w-[20%]">
                <Notifications />
            </div>
        </div>
    );
}

export default DashboardAdmin;
