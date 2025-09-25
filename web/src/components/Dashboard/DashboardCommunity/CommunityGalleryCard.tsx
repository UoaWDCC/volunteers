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
        <div className="w-full h-[540px] rounded-2xl relative max-[1536px]:h-[520px] pb-10">
            <div className="bg-primary h-[23%] rounded-t-2xl"> </div>

            <div
                className="
                    bg-lightGrey absolute 
                    w-[170px] top-[6%] left-1/2 transform -translate-x-1/2 
                    rounded-full
                    max-[1280px]:w-[150px] max-[1280px]:top-[7%]
                    max-[1024px]:w-[140px] max-[1024px]:top-[7.5%]
                    max-[768px]:w-[120px]  max-[768px]:top-[8%]
                    max-[640px]:w-[100px]  max-[640px]:top-[9%]
                ">
                <img src={user.profile_picture} alt="profile" className="w-full aspect-square object-cover rounded-full"/>
            </div>

            <div className="border-b-[1px] border-x-[1px] rounded-b-2xl border-lightGrey2 flex flex-col items-center">
                <p className="text-[25px] mt-[5.8rem] mb-0 text-black max-[1536px]:mt-[4.8rem] max-[1536px]:text-[22px]">{user.firstName + " " + user.lastName}</p>
                <p className="text-[40px] my-1 text-black max-[1536px]:text-[37px]">{user.hours}</p>
                <p className="text-body text-md text-lightGrey2 mb-6 max-[1536px]:text-[1.3rem]">hours</p>

                <div className="hidden md:flex items-center w-[70%] justify-between">
                    <div className="bg-lightGrey w-[40px] rounded-full flex-shrink-0">
                        {/* this should be the profile picture of the mutual, but for now just uses the user's img */}
                        <img
                        src={user.profile_picture}
                        alt=""
                        className="aspect-square rounded-full"
                        />
                    </div>
                    {/* THIS DOES NOT HANDLE MUTUALS, IDK HOW WE ARE GONNA DO THAT SO I HAVENT MADE PROPS FOR THE BELOW STUFF */}
                    <p className="text-body text-sm text-lightGrey2 ml-4 mb-0 mr-0">
                        jaquallelina and 12 other mutual friends
                    </p>
                </div>
                <div className="my-6">
                    <button className=" bg-primary text-body text-xl rounded-full px-9 py-2 sm:px-7 sm:py-1 md:px-9 md:py-2 hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] 
                    active:translate-y-0.5 transition-all ease-in-out duration-100 max-[1440px]:text-lg max-[1440px]:py-1 max-[1440px]:px-7 max-[1280px]:py-2 max-[1280px]:px-9 max-[1280px]:text-xl">
                        <div className="flex items-center gap-2">
                            <BsFillPersonPlusFill className="inline" />
                            {/* hide text on small screens */}
                            <p className="m-0 max-[1440px]:text-[14px] max-[1280px]:text-[1rem] hidden md:block" onClick={handleAddFriend}>
                            Add Friend
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
 
export default CommunityGalleryCard;