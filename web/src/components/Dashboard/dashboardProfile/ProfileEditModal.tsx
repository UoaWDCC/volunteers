import { useContext, useState, useEffect } from 'react';
import ProfileEditModalContext from '../../../context/ProfileEditModalContext';
import ProfileEditModalSideBarTab from '../dashboardProfile/ProfileEditModalSideBarTab';
import { AiFillCamera } from "react-icons/ai";
import AuthenticationContext from "../../../context/AuthenticationContext";

const ProfileEditModal = () => {
  //TEMPORARY PROFILE IMAGE
  const profileImgLink = '/assets/EventHighlights/Events/RelayForLife/imgB.png'
  // ######################
  const authContext = useContext(AuthenticationContext);
  const { isUserLoggedIn, firestoreUserDetails } = authContext as unknown as {isUserLoggedIn: boolean, firestoreUserDetails: any};
  const { showModal, setShowModal } = useContext(ProfileEditModalContext);
  const baseBackgroundStyle = 'fixed z-[500] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 ';
  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(false);
  const [page4, setPage4] = useState(false);

  //first page
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [upi, setUpi] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  // second page
  const [yearLevel, setYearLevel] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string[]>([]);
  const [driversLicense, setDriversLicense] = useState<string>('');
  const [otherRequirements, setOtherRequirements] = useState<string>('');
  // third page
  const [emergencyContactFirstName, setEmergencyContactFirstName] = useState<string>('');
  const [emergencyContactLastName, setEmergencyContactLastName] = useState<string>('');
  const [emergencyContactMobile, setEmergencyContactMobile] = useState<string>('');
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState<string>('');

  const [selectedTab, setSelectedTab] = useState('Personal Details');

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setGender(id);
  };

  const handleYearLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setYearLevel(id); // Set the year level to the selected radio button ID
  };

  const handleDietaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setDietaryRequirements((prev) => [...prev, id]);
    } else {
      setDietaryRequirements((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleDriversLicenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    setDriversLicense(id);
  };

  const goToRegisterPage = () => {
    setPage1(true);
    setPage2(false);
    setPage3(false);
    setPage4(false);
  };
  const goToAdditionalPage = () => {
    setPage1(false);
    setPage2(true);
    setPage3(false);
    setPage4(false);
  };

  const goToEmergencyPage = () => {
    setPage1(false);
    setPage2(false);
    setPage3(true);
    setPage4(false);
  };

  const goToDeletePage = () => {
    setPage1(false);
    setPage2(false);
    setPage3(false);
    setPage4(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // When update button clicked, all data at time of
    // click, is stored within newData.
    const newData = {
      firstName,
      lastName,
      email,
      mobile,
      birthdate,
      upi,
      gender,
      yearLevel,
      dietaryRequirements,
      driversLicense,
      emergencyContactFirstName,
      emergencyContactLastName,
      emergencyContactRelationship,
      emergencyContactMobile,
      otherRequirements
    }

    // Check if userId is available
    const userId = firestoreUserDetails?.uid;

    // If userId is not available, alert the user
    if (!userId) {
      alert('User ID not found. Try logging in again.');
      return;
    }

    console.log(newData);

    const response = await fetch(`api/users/:id${userId}`, {
      method: 'PATCH',
    }
    );
  }

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
        setBirthdate(firestoreUserDetails.birthdate);
        setUpi(firestoreUserDetails.upi);
        setGender(firestoreUserDetails.gender);
        setYearLevel(firestoreUserDetails.yearLevel);
        setDietaryRequirements(firestoreUserDetails.dietaryRequirements || []);
        setDriversLicense(firestoreUserDetails.driversLicense);
        setEmergencyContactFirstName(firestoreUserDetails.emergencyContactFirstName);
        setEmergencyContactLastName(firestoreUserDetails.emergencyContactLastName);
        setEmergencyContactRelationship(firestoreUserDetails.emergencyContactRelationship);
        setEmergencyContactMobile(firestoreUserDetails.emergencyContactMobile);
    }
}, []);

  return (
    <div
      id='modalBackground'
      className={showModal ? baseBackgroundStyle + 'opacity-100 visible' : baseBackgroundStyle + 'opacity-0 invisible'}
      onClick={(e) => {
        if (e.target == document.getElementById('modalBackground')) {
          setShowModal(false);
        }
      }}
    >
      <div className='bg-white flex rounded-3xl'>
        <div className='bg-primary rounded-l-3xl flex flex-col w-[230px] h-auto'>
          <div className="bg-black w-[130px] rounded-full mt-16 mb-8 mx-auto relative">
            {/* IMPLEMENT ON CLICK */}
            <div className='absolute text-white top-[0%] right-[0%] flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#00000094] rounded-full opacity-0 hover:opacity-100 hover:cursor-pointer transition-opacity duration-50'>
              <AiFillCamera size={40}/>
              <div className='font-light mt-2 text-center' style={{ userSelect: 'none' }}>
                <p style={{ fontSize: '10px', lineHeight: '0px' }} >Click to change</p>
                <p style={{ fontSize: '10px', lineHeight: '0px' }}>your photo</p>
              </div>
            </div>
            <img src={profileImgLink} alt="" className="w-[100%] object-cover aspect-square rounded-full" />
          </div>
          <div className="flex flex-col items-end mt-6 pl-5">
            <ProfileEditModalSideBarTab tabName='Personal Details' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchTab={goToRegisterPage} />
            <ProfileEditModalSideBarTab tabName='Additional Details' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchTab={goToAdditionalPage} />
            <ProfileEditModalSideBarTab tabName={'Emergency\nContact Details'} selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchTab={goToEmergencyPage} />
            <ProfileEditModalSideBarTab tabName='Delete Account' selectedTab={selectedTab} setSelectedTab={setSelectedTab} switchTab={goToDeletePage} />
          </div>
        </div>

        <div className='flex flex-col justify-between text-black'>
          <div className='py-12 px-16'>
            <form onSubmit={handleSubmit}>
              {page1 && (
                // REGISTER PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                <div className='h-[500px] w-[680px]'>
                  <div className='font-bold text-3xl mb-5'>Personal Details</div>
                  <div className='font-light'>
                    <p className='inline-block text-red-600'>*</p>
                    <p className='inline-block'>‎ ‎ ‎ ‎ ‎‎ Indicates required field</p>
                  </div>

                  <div className='grid gap-y-3 gap-x-24 md:grid-cols-2'>
                    <div>
                      <label htmlFor='first_name' className='inline-block text-sm font-medium text-black'>
                        First name
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='first_name' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='John' required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='last_name' className='inline-block text-sm font-medium text-black'>
                        Last name
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='last_name' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='Doe' required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='email' className='inline-block text-sm font-medium text-black'>
                        Email
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='email' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='johndoe@gmail.com' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='phone' className='inline-block text-sm font-medium text-black'>
                        Mobile Number
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='tel' id='phone' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='123 456 7890' required value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='upi' className='inline-block text-sm font-medium text-black'>
                        UPI
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='upi' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='jye583' required value={upi} onChange={(e) => setUpi(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='birthday' className='inline-blocktext-sm text-sm font-medium text-black'>
                        Date of Birth
                      </label>
                      <p className='inline-block text-white'>*</p>
                      <input type='text' id='birthday' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='01/01/2000' pattern='[0-9]{2}/[0-9]{2}/[0-9]{4}' value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    </div>
                  </div>
                  <div className='mb-6'>
                    <label htmlFor='gender' className='inline-block text-sm font-medium text-gray-900 text-black mt-4'>
                      Gender
                    </label>
                    <p className='inline-block text-red-600'>*</p>
                    <div className='flex space-x-3'>
                      <div>
                        <input type='radio' id='male' className='peer hidden' name='gender' onChange={handleGenderChange} checked={gender === 'male'} />
                        <label htmlFor='male' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Male
                        </label>
                      </div>
                      <div>
                        <input type='radio' id='female' className='peer hidden' name='gender' onChange={handleGenderChange} checked={gender === 'female'} />
                        <label htmlFor='female' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Female
                        </label>
                      </div>
                      <div>
                        <input type='radio' id='non-binary' className='peer hidden' name='gender' onChange={handleGenderChange} checked={gender.includes('non-binary')} />
                        <label htmlFor='non-binary' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Non-binary
                        </label>
                      </div>
                      <div>
                        <input type='radio' id='other' className='peer hidden' name='gender' onChange={handleGenderChange} checked={gender.includes('other')} />
                        <label htmlFor='other' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Other
                        </label>
                      </div>
                      <div>
                        <input type='radio' id='prefernottosay' className='peer hidden' name='gender' onChange={handleGenderChange} checked={gender.includes('prefernottosay')} />
                        <label htmlFor='prefernottosay' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Prefer not to say
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                // ADDITIONAL DETAILS PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              )}
              {page2 && (
                <div className='h-[500px] w-[680px]'>
                  <div className='font-bold text-3xl mb-5'>Additional Details</div>
                  <div className='font-light'>
                    <p className='inline-block text-red-600'>*</p>
                    <p className='inline-block'>‎ ‎ ‎ ‎ ‎‎ Indicates required field</p>
                  </div>

                  <div>
                    <label htmlFor='gender' className='inline-block text-sm font-medium text-gray-900 text-black'>
                      Year Level
                    </label>
                    <p className='inline-block text-red-600'>*</p>
                    <ul className='flex space-x-3'>
                      <li>
                        <div>
                          <input type='radio' id='first' className='peer hidden' name='yearlevel' onChange={handleYearLevelChange} checked={yearLevel.includes('first')} />
                          <label htmlFor='first' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            1st Year
                          </label>
                        </div>
                      </li>

                      <li>
                        <div>
                          <input type='radio' id='second' className='peer hidden' name='yearlevel' onChange={handleYearLevelChange} checked={yearLevel.includes('second')} />
                          <label htmlFor='second' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            2nd Year
                          </label>
                        </div>
                      </li>

                      <li>
                        <div>
                          <input type='radio' id='third' className='peer hidden' name='yearlevel' onChange={handleYearLevelChange} checked={yearLevel.includes('third')} />
                          <label htmlFor='third' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            3rd Year
                          </label>
                        </div>
                      </li>

                      <li>
                        <div>
                          <input type='radio' id='fourth' className='peer hidden' name='yearlevel' onChange={handleYearLevelChange} checked={yearLevel.includes('fourth')} />
                          <label htmlFor='fourth' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            4th Year
                          </label>
                        </div>
                      </li>

                      <li>
                        <div>
                          <input type='radio' id='postgraduate' className='peer hidden' name='yearlevel' onChange={handleYearLevelChange} checked={yearLevel.includes('postgraduate')} />
                          <label htmlFor='postgraduate' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Postgraduate
                          </label>
                        </div>
                      </li>

                      <li>
                        <div>
                          <input type='radio' id='otheryear' className='peer hidden' name='yearlevel' onChange={handleYearLevelChange} checked={yearLevel.includes('otheryear')} />
                          <label htmlFor='otheryear' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 hover:bg-slate-300 hover:shadow-light-2'>
                            Other
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <label htmlFor='gender' className='inline-block text-sm font-medium text-gray-900 text-black mt-4'>
                      Dietary Requirements
                    </label>
                    <p className='inline-block text-white'>*</p>
                    <p className='inline-block text-sm font-medium text-black'>(If Other, please specify below)</p>
                    <div className='flex space-x-3'>
                      <div>
                        <input type='checkbox' id='vegan' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('vegan')} required value={dietaryRequirements} />
                        <label htmlFor='vegan' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Vegan
                        </label>
                      </div>
                      <div>
                        <input type='checkbox' id='vegetarian' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('vegetarian')} required value={dietaryRequirements} />
                        <label htmlFor='vegetarian' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Vegetarian
                        </label>
                      </div>
                      <div>
                        <input type='checkbox' id='dairyfree' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('dairyfree')} required value={dietaryRequirements} />
                        <label htmlFor='dairyfree' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Dairy-free
                        </label>
                      </div>
                      <div>
                        <input type='checkbox' id='glutenfree' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('glutenfree')} required value={dietaryRequirements} />
                        <label htmlFor='glutenfree' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Gluten-free
                        </label>
                      </div>
                      <div>
                        <input type='checkbox' id='halal' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('halal')} required value={dietaryRequirements} />
                        <label htmlFor='halal' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Halal
                        </label>
                      </div>
                      <div>
                        <input type='checkbox' id='otherrequirements' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('otherrequirements')} required value={dietaryRequirements} />
                        <label htmlFor='otherrequirements' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                          Other
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor='gender' className='inline-block text-sm font-medium text-gray-900 text-black mt-4'>
                      Driver's License
                    </label>
                    <p className='inline-block text-white'>*</p>
                    <ul className='flex space-x-3'>
                      <li>
                        <div>
                          <input type='radio' id='none' className='peer hidden' name='license' onChange={handleDriversLicenseChange} checked={driversLicense.includes('none')} />
                          <label htmlFor='none' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            None
                          </label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input type='radio' id='learners' className='peer hidden' name='license' onChange={handleDriversLicenseChange} checked={driversLicense.includes('learners')} />
                          <label htmlFor='learners' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Learners
                          </label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input type='radio' id='restricted' className='peer hidden' name='license' onChange={handleDriversLicenseChange} checked={driversLicense.includes('restricted')} />
                          <label htmlFor='restricted' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Restricted
                          </label>
                        </div>
                      </li>
                      <li>
                        <div>
                          <input type='radio' id='full' className='peer hidden' name='license' onChange={handleDriversLicenseChange} checked={driversLicense.includes('full')} />
                          <label htmlFor='full' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Full
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <label htmlFor='other_needs' className='inline-block text-sm font-medium text-black mt-4'>
                      Accessibility/Other Dietary Needs
                    </label>
                    <p className='inline-block text-white'>*</p>
                    <input type='text' id='other_needs' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg block p-2.5 pr-20' placeholder='Wheelchair access, seafood allergy' value={otherRequirements} onChange={(e) => setOtherRequirements(e.target.value)} />
                  </div>
                </div>
              )}

              {page3 && (
                // EMERGENCY CONTACT PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!################
                <div className='h-[500px] w-[680px]'>
                  <div className='font-bold text-3xl mb-5'>Emergency Contact Details</div>
                  <div className='font-light'>
                    <p className='inline-block text-red-600'>*</p>
                    <p className='inline-block'>‎ ‎ ‎ ‎ ‎‎ Indicates required field</p>
                  </div>

                  <div className='grid gap-y-3 gap-x-24 md:grid-cols-2'>
                    <div>
                      <label htmlFor='first_name' className='inline-block text-sm font-medium text-black'>
                        First name
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='first_name' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='John' required value={emergencyContactFirstName} onChange={(e) => setEmergencyContactFirstName(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='last_name' className='inline-block text-sm font-medium text-black'>
                        Last name
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='last_name' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='Doe' required value={emergencyContactLastName} onChange={(e) => setEmergencyContactLastName(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='phone' className='inline-block text-sm font-medium text-black'>
                        Mobile Number
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='tel' id='phone' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='123 456 7890' required value={emergencyContactMobile} onChange={(e) => setEmergencyContactMobile(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='relationship' className='inline-block text-sm font-medium text-black'>
                        Relationship
                      </label>
                      <p className='inline-block text-red-600'>*</p>
                      <input type='text' id='relationship' className='border border-slate-300 border-solid text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-20' placeholder='Mother' required value={emergencyContactRelationship} onChange={(e) => setEmergencyContactRelationship(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {page4 && (
                <div className='h-[500px] w-[680px]'>
                  <div className='font-bold text-3xl mb-5'>Delete Account</div>
                  <div className='font-light'>
                    <p className='inline-block'>We hate to see you go! But if you would like to delete your account, click the button at the bottom.</p>
                  </div>
                  </div>
              )}
            </form>
          </div>
          <div className='bg-slate-100 py-5 rounded-b-[1rem] -mt-[36px]'>
            <div className='flex gap-3 justify-end w-[100%] pr-8'>
              <button type='button' onClick={closeModal} className=' inline-block border border-primary border-solid text-primary bg-white hover:bg-slate-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center active:translate-y-0.5 transition-all ease-in-out duration-100'>
                Cancel
              </button>
              {page4 ? (
                <button type='button' onClick={handleSubmit} className='inline-block text-white bg-primary hover:bg-primary-dark active:translate-y-0.5 transition-all ease-in-out duration-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                  Delete Account
                </button>
              ) : (
                  <button type='button' onClick={handleSubmit} className='inline-block text-white bg-primary hover:bg-primary-dark active:translate-y-0.5 transition-all ease-in-out duration-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                    Update
                  </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditModal;