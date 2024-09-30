import CommunityGalleryWhole from "../DashboardCommunity/CommunityGalleryWhole";
import Leaderboard from "../Leaderboard";

function DashboardCommunity() {
  return (
    <div className="flex flex-row w-[100%] h-[85vh] px-5 gap-5 overflow-scroll scrollbar-none">
      <div className="flex flex-col w-[80%]">
        <CommunityGalleryWhole />
      </div>

      <div className="sticky top-1 flex justify-end w-[20%] h-[84vh]">
        <Leaderboard />
      </div>
    </div>
  );
}

export default DashboardCommunity;
