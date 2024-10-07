import axios from "axios";
import { useState, useEffect, useContext } from "react";
import CommunityGalleryCard from "../DashboardCommunity/CommunityGalleryCard";
import CommunitySearchContext from "../../../context/CommunitySearchContext";

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
    <div className="bg-white rounded-3xl py-10 px-[4%] w-full text-subheading text-black shadow-lg max-[1887px]:px-[6%] max-[1770px]:px-[3%] max-[1510px]:px-[8%]">
      <p>People you may know: </p>
      <div className="flex gap-x-[1%] justify-start gap-y-2 flex-wrap">
        {filteredData.map((user: userData, index: number) => (
          <CommunityGalleryCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default CommunityGallery;
