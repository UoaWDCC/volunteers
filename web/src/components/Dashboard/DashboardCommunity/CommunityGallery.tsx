import axios from 'axios';
import { useState, useEffect } from 'react';
import CommunityGalleryCard from '../DashboardCommunity/CommunityGalleryCard';

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

const CommunityGallery = () => {

  const [data, setData] = useState<userData[]>([]);

    useEffect(() => {
    // Fetch gallery data
    axios.get('http://localhost:3000/api/users')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  , []);

  
    return (  
        <div className='bg-white rounded-3xl py-10 px-[4%] w-full text-subheading text-black shadow-lg max-[1887px]:px-[6%] max-[1770px]:px-[3%] max-[1510px]:px-[8%]'>
            <p>People you may know: </p>
            <div className='flex gap-x-[5px] justify-between gap-y-2 flex-wrap '>
              {data.map((user, index) => (
                <CommunityGalleryCard key={index} user={user} />
              ))}
            </div>
        </div>
    );
}
 
export default CommunityGallery;