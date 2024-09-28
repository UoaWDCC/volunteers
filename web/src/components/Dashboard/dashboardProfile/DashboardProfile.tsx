import ProfileMyProfileHeading from "./ProfileMyProfileHeading";
import ProfileMyProfileOverview from "./ProfileMyProfileOverview";
import ProfileMyProfileProgressBar from "./ProfileMyProfileProgressBar";

function DashboardProfile() {
  return (
    <div className="overflow-hidden flex flex-col w-[96%]">

                {/* width of the gallery */}
                <div className='flex flex-col mb-5 h-[16rem]'>
                    <ProfileMyProfileHeading name ="John Doe"></ProfileMyProfileHeading>
                </div>
                    
                <div className='flex flex-row gap-5 flex-1 mb-2'>
                    {/* adjust sizes and stuff as needed */}
                    <div className="w-[75%]">
                        <ProfileMyProfileOverview></ProfileMyProfileOverview>
                    </div>

                    <div className="w-[25%]">
                        <ProfileMyProfileProgressBar totalHours={20} completedHours={14}></ProfileMyProfileProgressBar>
                    </div>
                </div>
            
        </div>
        
  );
}

export default DashboardProfile;