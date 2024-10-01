import { BsFillPersonPlusFill } from "react-icons/bs";

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

    if (user.profile_picture === "" || user.profile_picture === null || user.profile_picture === undefined) {
        console.log(user.profile_picture);
        user.profile_picture = "assets/profile_placeholder.png";
    }

    return (  
        <div className="w-[300px] h-[540px] rounded-2xl relative max-[1887px]:w-[270px] max-[1887px]:h-[510px] max-[1755px]:w-[300px]">
            <div className="bg-primary h-[23%] rounded-t-2xl">
            </div>

            <div className="bg-lightGrey absolute w-[150px] top-[7%] right-[25%] rounded-full max-[1887px]:w-[125px] max-[1887px]:right-[26%] max-[1755px]:right-[28%]"> 
                <img src={user.profile_picture} alt="profile" className="w-[100%] object-cover aspect-square rounded-full"/>
            </div>

            <div className="border-b-[1px] border-x-[1px] rounded-b-2xl border-lightGrey2 h-[70%] flex flex-col items-center">
                <p className="text-[25px] mt-[5.8rem] mb-0 text-black max-[1887px]:mt-[4rem]">{user.firstName + " " + user.lastName}</p>
                <p className="text-[40px] my-1 text-black">{user.hours}</p>
                <p className="text-body text-m text-lightGrey2 mb-6">hours</p>

                <div className="flex items-center w-[70%] justify-between">
                    <div className="bg-lightGrey w-[40px] rounded-full flex-shrink-0">
                        <img src={user.profile_picture} alt="" className="aspect-square rounded-full object-cover"/> {/* this should be the profile picture of the mutual, but for now just uses the user's img */}
                    </div>
                    {/* THIS DOES NOT HANDLE MUTUALS, IDK HOW WE ARE GONNA DO THAT SO I HAVENT MADE PROPS FOR THE BELOW STUFF */}
                    <p className="text-body text-sm text-lightGrey2 ml-4 mb-0 mr-0">jaquallelina and 12 other mutual friends</p>
                </div>

                <button className="bg-primary text-body text-xl rounded-full py-2 px-9 mt-5 hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100">
                    <div className="flex items-center gap-2">
                        <BsFillPersonPlusFill className="inline"/>
                        <p className="m-0" onClick={ handleAddFriend }>Add Friend</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
 
export default CommunityGalleryCard;