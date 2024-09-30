import CommunityGalleryWhole from "./CommunityGalleryWhole";
import Leaderboard from "../Leaderboard";

function DashboardCommunity() {
  return (
    <div className="flex flex-row w-full h-full gap-5">
      <div className="flex flex-col w-[75%] h-full overflow-y-auto scrollbar-none shadow-lg rounded-lg">
        <CommunityGalleryWhole />
      </div>

      <div className="w-[20%]">
        <Leaderboard />
      </div>
    </div>
  );
}

export default DashboardCommunity;
