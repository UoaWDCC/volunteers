import Leaderboard from "./Leaderboard";
import WelcomeStats from "./WelcomeStats";
import UpcomingEvents from "./UpcomingEvents";

function DashboardDashboard() {
  return (
    <div className="dashboard overflow-y-hidden flex flex-row w-[100%] h-screen px-5 gap-5 mb-10">
      {/* width of the gallery */}
      <div className="w-[70%] flex flex-col gap-2">
        <div className=" w-h-[20%]">
          <WelcomeStats />
        </div>
        <div className="h-[60%]">
          <UpcomingEvents />
        </div>
      </div>

      <div className="w-[30%] h-[40vw]">
        {/* adjust sizes and stuff as needed */}
        <Leaderboard />
      </div>
    </div>
  );
}

export default DashboardDashboard;
