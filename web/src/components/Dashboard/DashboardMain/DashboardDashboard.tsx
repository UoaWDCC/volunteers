import Leaderboard from "../Leaderboard";
import WelcomeStats from "./WelcomeStats";
import UpcomingEvents from "./UpcomingEvents";
import UpcomingEvent from "./UpcomingEvent";

function DashboardDashboard() {
  return (
    <div className="flex flex-row w-full h-full gap-5">
      {/* width of the gallery */}
      <div className="w-[75%] h-full flex flex-col gap-8">
        <div className="flex-none">
          <WelcomeStats />
        </div>
        <div className="flex-1 shadow-lg rounded-lg overflow-y-auto">
          <UpcomingEvents />
        </div>
      </div>

      <div className="w-[20%]">
        {/* adjust sizes and stuff as needed */}
        <Leaderboard />
      </div>
    </div>
  );
}

export default DashboardDashboard;
