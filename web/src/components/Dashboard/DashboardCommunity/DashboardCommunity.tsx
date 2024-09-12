import CommunityGalleryWhole from '@components/Dashboard/DashboardCommunity/CommunityGalleryWhole';
import Leaderboard from '../../Leaderboard';

function DashboardCommunity() {
  return (
    <div className="overflow-hidden flex flex-row w-[100%] px-5 gap-5">

                <div className='flex flex-col w-[80%]'>
                    <CommunityGalleryWhole />
                </div>
                    
                <div className='flex justify-end w-[20%] h-[40vw]'>
                    <Leaderboard />
                </div>
            
        </div>
        
  );
}

export default DashboardCommunity;