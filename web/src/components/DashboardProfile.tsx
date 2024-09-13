import ProfileMyProfileHeading from "./ProfileMyProfileHeading";
import ProfileMyProfileOverview from "./ProfileMyProfileOverview";
import ProfileMyProfileProgressBar from "./ProfileMyProfileProgressBar";

function DashboardProfile() {
  return (
    <div className="overflow-hidden flex flex-col w-[100%] h-screen px-5">

                {/* width of the gallery */}
                <div className='flex flex-col bg-red-100 mb-5 h-[40%]'>
                    <ProfileMyProfileHeading name ="John Doe"></ProfileMyProfileHeading>
                </div>
                    
                <div className='bg-green-100 flex flex-row justify-between gap-5 mb-5 h-[60%]'>
                    {/* adjust sizes and stuff as needed */}
                    <div className="bg-orange-100 w-[65%] h-[700px]">
                        <ProfileMyProfileOverview></ProfileMyProfileOverview>
                    </div>

                    <div className="bg-purple-100 w-[35%] h-[500px]">
                        <ProfileMyProfileProgressBar totalHours={20} completedHours={14}></ProfileMyProfileProgressBar>
                    </div>
                </div>
            
        </div>
        
  );
}

export default DashboardProfile;