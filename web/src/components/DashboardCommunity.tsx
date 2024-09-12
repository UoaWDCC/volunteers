import CommunityGalleryWhole from '@components/CommunityGalleryWhole';
import Leaderboard from './Leaderboard';

function DashboardCommunity() {
  return (
    <div className="overflow-hidden flex flex-row w-[100%] px-5 gap-5">


                {/* width of the gallery */}
                <div className='flex flex-col w-[70%]'>
                    <CommunityGalleryWhole />
                </div>
                    
                {/* width of the leadboard thing thing */}
                <div className='bg-green-100 w-[30%] h-[40vw]'>
                    {/* place thing component here and remove bg-green */}
                    <Leaderboard />
                </div>
            
        </div>
        
  );
}

export default DashboardCommunity;