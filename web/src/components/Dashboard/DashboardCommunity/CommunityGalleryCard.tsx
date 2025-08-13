import { BsFillPersonPlusFill } from "react-icons/bs";
import PlaceholderPFP from "../placeholderPfp";

type userData = {
    profile_picture: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    upi: string;
    birthdate: string;
    gender: string;
    yearLevel: string;
    dietaryRequirements: string;
    driversLicense: string;
    hours: number;
    otherRequirements: string;
    emergencyContactFirstName: string;
    emergencyContactLastName: string;
    emergencyContactMobile: string;
    emergencyContactRelationship: string;
  }

interface CommunityGalleryCardProps {
  user: userData;
}

const CommunityGalleryCard = ({user}: CommunityGalleryCardProps) => {
    
    const handleAddFriend = () => {
        console.log('add friend');
    };

    // This function will handle hours, if it recieves 0 or null then it will return 0
    const formatHours = (hours: number | null) => {
        if (hours === null || hours === 0|| hours === undefined) {
            return "0";
        }
        return hours;
    };

    return (  
        <div className="w-full h-[540px] rounded-2xl relative max-[1536px]:h-[520px] flex flex-col justify-center">
            {/* Top background bar */}
            <div className="bg-primary h-[23%] w-full rounded-t-2xl"></div>

            {/* Profile picture container – overlapping */}
           <div className="w-40 rounded-full absolute top-[10%] left-1/2 transform -translate-x-1/2">
                <PlaceholderPFP
                    size="w-40 aspect-square"
                    name={user.firstName + " " + user.lastName}
                    imageSource={user.profile_picture}
                />
            </div>

            <div className="border-b-[1px] border-x-[1px] rounded-b-2xl border-lightGrey2 h-[70%] flex flex-col items-center">
                <p className="text-[25px] mt-[5.8rem] mb-0 text-black max-[1536px]:mt-[4.8rem] max-[1536px]:text-[22px]">{user.firstName + " " + user.lastName}</p>
                <p className="text-[40px] my-1 text-black max-[1536px]:text-[37px]">{formatHours(user.hours)}</p>
                <p className="text-body text-md text-lightGrey2 mb-6 max-[1536px]:text-[1.3rem]">hours</p>

                <div className="flex items-center w-[70%] justify-between">
                    <div className="bg-lightGrey w-[40px] rounded-full flex-shrink-0">
                        <PlaceholderPFP
                            size="w-10 aspect-square"
                            name={user.firstName + " " + user.lastName}
                            imageSource={user.profile_picture}
                        />
                    </div>
                    {/* THIS DOES NOT HANDLE MUTUALS, IDK HOW WE ARE GONNA DO THAT SO I HAVENT MADE PROPS FOR THE BELOW STUFF */}
                    <p className="text-body text-sm text-lightGrey2 ml-4 mb-0 mr-0 max-[1536px]:text-[0.81rem] max-[1280px]:text-sm">jaquallelina and 12 other mutual friends</p>
                </div>

                <button className="absolute bottom-[13%] bg-primary text-body text-xl rounded-full py-2 px-9 hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100 max-[1440px]:text-lg max-[1440px]:py-1 max-[1440px]:px-7 max-[1280px]:py-2 max-[1280px]:px-9 max-[1280px]:text-xl">
                    <div className="flex items-center gap-2">
                        <BsFillPersonPlusFill className="inline"/>
                        <p className="m-0 max-[1440px]:text-[14px] max-[1280px]:text-[1rem]" onClick={ handleAddFriend }>Add Friend</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
 
export default CommunityGalleryCard;