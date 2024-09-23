import Leaderboard from "../Leaderboard";
import WelcomeStats from "./WelcomeStats";
import UpcomingEvents from "./UpcomingEvents";

function DashboardDashboard() {
  return (
    <div className="dashboard overflow-y-hidden flex flex-row w-full h-full pt-0 p-5 gap-5">
      {/* width of the gallery */}
      <div className="w-[75%] flex flex-col gap-2">
        <div className="">
          <WelcomeStats />
        </div>
        <div className="h-[62%]">
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
