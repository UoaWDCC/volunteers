import axios from "axios";
import { useState, useEffect, useContext } from "react";
import CommunityGalleryCard from "../DashboardCommunity/CommunityGalleryCard";
import CommunitySearchContext from "../../../context/CommunitySearchContext";
import FriendRequest from "./FriendRequest";

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
};

const CommunityGallery = () => {
  const [data, setData] = useState<userData[]>([]);
  const [filteredData, setFilteredData] = useState<userData[]>([]);

  const context = useContext(CommunitySearchContext);

  const filterUsers = (users: userData[]) => {
    return users.filter((user) => {
      const fullName = user.firstName + " " + user.lastName;
      return fullName.toLowerCase().includes(context.searchTerm.toLowerCase());
    });
  };

  useEffect(() => {
    // Fetch gallery data
    const appUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${appUrl}/api/users`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredData(filterUsers(data));
  }, [context.searchTerm, data]);

  return (  
      <div className='bg-white py-10 px-[4%] w-full text-subheading text-black shadow-lg'>
          <p>Friend Requests:</p>
          <div className="w-full grid grid-cols-3 gap-x-[2%] gap-y-4 max-[1280px]:grid-cols-2 min-[2100px]:grid-cols-4 min-[2560px]:grid-cols-5 overflow-y-auto scrollbar-none">
          {/* Insert placeholder friend request */}
          <FriendRequest 
            username="John Doe"
            avatarUrl="https://ui-avatars.com/api/?name=John+Doe"
            onAccept={() => console.log("Accepted John Doe's request")}
            onDecline={() => console.log("Declined John Doe's request")}
          />
          </div>
          <hr className="my-4" />
          
          <p>Our Community: </p>
          <div className='w-full grid grid-cols-3 gap-x-[2%] gap-y-4 max-[1280px]:grid-cols-2 min-[2100px]:grid-cols-4 min-[2560px]:grid-cols-5 overflow-y-auto scrollbar-none'>
            {filteredData.map((user: userData, index: number) => (
              <CommunityGalleryCard key={index} user={user} />
            ))}
          </div>
      </div>
  );
}
 
export default CommunityGallery;
