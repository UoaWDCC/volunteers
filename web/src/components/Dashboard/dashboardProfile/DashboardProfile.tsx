import { useContext, useEffect, useState } from "react";
import ProfileMyProfileHeading from "./ProfileMyProfileHeading";
import ProfileMyProfileOverview from "./ProfileMyProfileOverview";
import ProfileMyProfileProgressBar from "./ProfileMyProfileProgressBar";
import AuthenticationContext from "../../../context/AuthenticationContext";

function DashboardProfile() {
    const authContext = useContext(AuthenticationContext);
    const { isUserLoggedIn, firestoreUserDetails } = authContext as unknown as {isUserLoggedIn: boolean, firestoreUserDetails: any};
    const [firstName, setFirstName] = useState("1");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [upi, setUpi] = useState("");
    const [gender, setGender] = useState("");
    const [yearLevel, setYearLevel] = useState("");
    const [dietary, setDietary] = useState([]);
    const [license, setLicense] = useState("");
    const [emergencyFirstName, setEmergencyFirstName] = useState("");
    const [emergencyLastName, setEmergencyLastName] = useState("");
    const [relationship, setRelationship] = useState("");
    const [emergencyMobile, setEmergencyMobile] = useState("");
    
    useEffect(() => {
        console.log("User is logged in: ", isUserLoggedIn);
        if (!isUserLoggedIn) {
            // redirect to login page
            // window.location.href = "/login";
            console.log("User is not logged in");
        }

        if (firestoreUserDetails) {
            setFirstName(firestoreUserDetails.firstName);
            setLastName(firestoreUserDetails.lastName);
            setEmail(firestoreUserDetails.email);
            setMobile(firestoreUserDetails.mobile);
            setDob(firestoreUserDetails.birthdate);
            setUpi(firestoreUserDetails.upi);
            setGender(firestoreUserDetails.gender);
            setYearLevel(firestoreUserDetails.yearLevel);
            setDietary(firestoreUserDetails.dietaryRequirements || []);
            setLicense(firestoreUserDetails.driversLicense);
            setEmergencyFirstName(firestoreUserDetails.emergencyContactFirstName);
            setEmergencyLastName(firestoreUserDetails.emergencyContactLastName);
            setRelationship(firestoreUserDetails.emergencyContactRelationship);
            setEmergencyMobile(firestoreUserDetails.emergencyContactMobile);
            
        }
    }, []);
  return (
    <div className="overflow-hidden flex flex-col w-[100%] h-screen px-5">

                {/* width of the gallery */}
                <div className='flex flex-col bg-red-100 mb-5 h-[40%]'>
              <ProfileMyProfileHeading name={ firstName }></ProfileMyProfileHeading>
                </div>
                    
                <div className='bg-green-100 flex flex-row justify-between gap-5 mb-5 h-[60%]'>
                    {/* adjust sizes and stuff as needed */}
                    <div className="bg-orange-100 w-[65%] h-[700px]">
                        <ProfileMyProfileOverview
                            firstName={firstName}
                            lastName={lastName}
                            email={email} mobile={mobile}
                            upi={upi} dob={dob}
                            gender={gender}
                            yearLevel={yearLevel}
                            dietary={dietary}
                            license={license}
                            emergencyFirstName={emergencyFirstName}
                            emergencyLastName={emergencyLastName}
                            relationship={relationship}
                            emergencyMobile={emergencyMobile}                            
                        ></ProfileMyProfileOverview>
                    </div>

                    <div className="bg-purple-100 w-[35%] h-[500px]">
                        <ProfileMyProfileProgressBar totalHours={20} completedHours={14}></ProfileMyProfileProgressBar>
                    </div>
                </div>
            
        </div>
        
  );
}

export default DashboardProfile;