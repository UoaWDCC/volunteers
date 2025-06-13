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

    const getFullName = (user?: { firstName?: string; lastName?: string }) =>
    [user?.firstName, user?.lastName].filter(Boolean).join(" ");

    const pfp = firestoreUserDetails?.profile_picture || ""; 
    
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
    }, [firestoreUserDetails]);
  return (
    <div className="flex flex-col gap-6 w-[96%] h-full overflow-auto scrollbar-none">
                {/* width of the gallery */}
                <div className='flex min-h-[16rem]'>
                    <ProfileMyProfileHeading name={getFullName({ firstName, lastName })} img= {pfp} />
                </div>
                
                {/* Main Content */}
                <div className='flex flex-row flex-1 gap-5'>
                    {/* adjust sizes and stuff as needed */}
                    <div className="flex-[4]">
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

                    {/* Progress Panel */}
                    <div className="flex-1">
                        <ProfileMyProfileProgressBar totalHours={20} completedHours={14}></ProfileMyProfileProgressBar>
                    </div>
                </div>
            
        </div>
        
  );
}

export default DashboardProfile;