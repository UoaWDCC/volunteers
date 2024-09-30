import ProfileMyProfileHeading from "./ProfileMyProfileHeading";
import ProfileMyProfileOverview from "./ProfileMyProfileOverview";
import ProfileMyProfileProgressBar from "./ProfileMyProfileProgressBar";

function DashboardProfile() {
  return (
    <div className="flex flex-col gap-6 w-[96%] h-full overflow-auto scrollbar-none">
                {/* width of the gallery */}
                <div className='flex min-h-[16rem]'>
                    <ProfileMyProfileHeading name ="John Doe"></ProfileMyProfileHeading>
                </div>
                    
                <div className='flex flex-row flex-1 gap-5'>
                    {/* adjust sizes and stuff as needed */}
                    <div className="flex-[4]">
                        <ProfileMyProfileOverview></ProfileMyProfileOverview>
                    </div>

                    <div className="flex-1">
                        <ProfileMyProfileProgressBar totalHours={20} completedHours={14}></ProfileMyProfileProgressBar>
                    </div>
                </div>
            
        </div>
        
  );
}

export default DashboardProfile;