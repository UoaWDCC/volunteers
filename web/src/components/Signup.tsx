import { useNavigate } from 'react-router-dom';
import AuthenticationContext from '../context/AuthenticationContext';
import RegisterModalErrorContext from '../context/RegisterModalErrorContext.tsx';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import RegisterErrorModal from './RegisterErrorModal.tsx';

function Signup() {
  const navigate = useNavigate();
  const { showModal, setShowModal, setMessage, setError, setMissingFields } = useContext(RegisterModalErrorContext);
  const authContext = useContext(AuthenticationContext);
  const { currentUser, uid } = authContext as unknown as { currentUser: any; uid: string; signOut: () => void; isUserLoggedIn: boolean };

  if (!authContext) {
    return null;
  }

  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(false);

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

  //initialise pages on startup
  useEffect(() => {
    goToRegisterPage();
    console.log('initialised signup currentUser from Auth', currentUser);
  }, []);

  const goToRegisterPage = () => {
    setPage1(true);
    setPage2(false);
    setPage3(false);
  };
  const goToAdditionalPage = () => {
    setPage1(false);
    setPage2(true);
    setPage3(false);
  };

  const goToEmergencyPage = () => {
    setPage1(false);
    setPage2(false);
    setPage3(true);
  };

  const goToHomePage = () => {
    navigate('/');
  };

  // write to collection not document
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(true);
    console.log('Validating info');
    if(!firstName || !lastName || !email || !mobile || !upi || !gender || !yearLevel || !emergencyContactFirstName || !emergencyContactLastName || !emergencyContactMobile || !emergencyContactRelationship) {
      setError('Missing Fields.');
      const missingFieldsList = [];
      if (!firstName) {
        missingFieldsList.push('First Name');
      }
      if (!lastName) {
        missingFieldsList.push('Last Name');
      }
      if (!email) {
        missingFieldsList.push('Email');
      }
      if (!mobile) {
        missingFieldsList.push('Mobile Number');
      }
      if (!upi) {
        missingFieldsList.push('UPI');
      }
      if (!gender) {
        missingFieldsList.push('Gender');
      }
      if (!yearLevel) {
        missingFieldsList.push('Year Level');
      }
      if (!emergencyContactFirstName) {
        missingFieldsList.push('Emergency Contact First Name');
      }
      if (!emergencyContactLastName) {
        missingFieldsList.push('Emergency Contact Last Name');
      }
      if (!emergencyContactMobile) {
        missingFieldsList.push('Emergency Contact Mobile Number');
      }
      if (!emergencyContactRelationship) {
        missingFieldsList.push('Emergency Contact Relationship');
      }
      setMissingFields(missingFieldsList);
      setMessage(`Please enter values for: ${missingFieldsList.join(', ')}.`);
      setShowModal(true);
      return;
    }

    if (!validatePhoneNumber(mobile)) {
      setError('Invalid Mobile Number.');
      setMessage('Please enter a valid mobile number or enter in the correct format.');
      setShowModal(true);
      return;
    }

    if (!validatePhoneNumber(emergencyContactMobile)) {
      setError('Invalid Emergency Contact Mobile Number.');
      setMessage('Please enter a valid emergency contact mobile number or enter in the correct format.');
      setShowModal(true);
      return;
    }

    if(!validatEmail(email)) {
      console.log('Invalid Email');
      setError('Invalid Email.');
      setMessage('Please enter a valid email address.');
      setShowModal(true);
      return;
    }
    setShowModal(false);
    if (currentUser) {
      try {
        // Reference to the 'users' collection
        const colRef = collection(db, 'users');
        const q = query(colRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {

          // If the user does not exist, add a new document to the collection
          await addDoc(colRef, {
            uid,
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
            otherRequirements,
            emergencyContactFirstName,
            emergencyContactLastName,
            emergencyContactMobile,
            emergencyContactRelationship,
          });
          console.log('Document successfully written!');
        }

        // Navigate to another page after successful submission
        goToHomePage();
      } catch (error) {
        console.error('Error writing document: ', error);
      }
    } else {
      console.log('No user logged in', currentUser);
    }
  };

  function validatePhoneNumber(phoneNumber: string) {
      phoneNumber = phoneNumber.replace(/\s/g, '');
      const phonePattern9 = /^\d{3}\d{3}\d{3}$/;
      const phonePattern10 = /^\d{3}\d{3}\d{4}$/;
      const phonePattern11 = /^\d{4}\d{3}\d{4}$/;
      
      return phonePattern10.test(phoneNumber) || phonePattern11.test(phoneNumber) || phonePattern9.test(phoneNumber);
    }

  function validatEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  return (
    <div>
      {showModal && (<RegisterErrorModal/>)}
      <form onSubmit={handleSubmit}>
        {page1 && (
          // REGISTER PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          <>
            <div className='bg-greybg h-screen w-screen flex'>
              <div className='py-[60px]'>
                <div className='bg-white shadow-2xl rounded-t-[1rem] w-[940px] h-[560px] mx-[280px] items-center'>
                  <div className='px-[50px] py-[30px]'>
                    <div className='flex space-x-5'>
                      <div className='inline-block mb-5'>
                        <div className='text-xs text-primary'>1. Personal Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-primary'></div>
                      </div>
                      <div className='inline-block'>
                        <div className='text-xs text-slate-300'>2. Additional Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-slate-300'></div>
                      </div>
                      <div className='inline-block'>
                        <div className='text-xs text-slate-300'>3. Emergency Contact Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-slate-300'></div>
                      </div>
                    </div>

                    <div className='font-bold text-3xl mb-5'>Personal Details</div>
                    <div className='font-light'>
                      <p className='inline-block text-red-600'>*</p>
                      <p className='inline-block'>‎ ‎ ‎ ‎ ‎‎ Indicates required field</p>
                    </div>

                    <div className='grid gap-3 md:grid-cols-2'>
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
                  <div className='bg-slate-100 py-5 rounded-b-[1rem] flex space-x-2 -mt-[36px]'>
                    <button type='button' className='select-none cursor-default ml-[717.5px] inline-block border border-slate-100 border-solid text-slate-100 bg-slate-100 hover:bg-slate-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center active:translate-y-0.5 transition-all ease-in-out duration-100'>
                      Back
                    </button>
                    <button type='button' onClick={goToAdditionalPage} className='inline-block text-white bg-primary hover:bg-primary-dark active:translate-y-0.5 transition-all ease-in-out duration-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>

          // ADDITIONAL DETAILS PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        )}
        {page2 && (
          <>
            <div className='bg-greybg h-screen w-screen'>
              <div className='py-[60px]'>
                <div className='bg-white shadow-2xl rounded-t-[1rem] w-[940px] h-[560px] mx-[280px]'>
                  <div className='px-[50px] py-[30px]'>
                    <div className='flex space-x-5'>
                      <div className='inline-block mb-5'>
                        <div className='text-xs text-primary'>1. Personal Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-primary'></div>
                      </div>
                      <div className='inline-block'>
                        <div className='text-xs text-primary'>2. Additional Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-primary'></div>
                      </div>
                      <div className='inline-block'>
                        <div className='text-xs text-slate-300'>3. Emergency Contact Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-slate-300'></div>
                      </div>
                    </div>

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
                          <input type='checkbox' id='vegan' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('vegan')} required value={dietaryRequirements}/>
                          <label htmlFor='vegan' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Vegan
                          </label>
                        </div>
                        <div>
                          <input type='checkbox' id='vegetarian' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('vegetarian')} required value={dietaryRequirements}/>
                          <label htmlFor='vegetarian' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Vegetarian
                          </label>
                        </div>
                        <div>
                          <input type='checkbox' id='dairyfree' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('dairyfree')} required value={dietaryRequirements}/>
                          <label htmlFor='dairyfree' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Dairy-free
                          </label>
                        </div>
                        <div>
                          <input type='checkbox' id='glutenfree' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('glutenfree')} required value={dietaryRequirements}/>
                          <label htmlFor='glutenfree' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Gluten-free
                          </label>
                        </div>
                        <div>
                          <input type='checkbox' id='halal' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('halal')} required value={dietaryRequirements}/>
                          <label htmlFor='halal' className='select-none cursor-pointer peer-checked:bg-primary peer-checked:text-white border border-slate-300 border-solid inline-block rounded-full bg-white px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-black shadow-light-3 transition duration-150 ease-in-out hover:bg-slate-300 hover:shadow-light-2 focus:bg-slate-300 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none'>
                            Halal
                          </label>
                        </div>
                        <div>
                          <input type='checkbox' id='otherrequirements' className='peer hidden' onChange={handleDietaryChange} checked={dietaryRequirements.includes('otherrequirements')} required value={dietaryRequirements}/>
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
                  <div className='bg-slate-100 py-5 rounded-b-[1rem] flex space-x-2 -mt-[6.3px]'>
                    <button type='button' onClick={goToRegisterPage} className='ml-[717.5px] inline-block border border-primary border-solid text-primary bg-white hover:bg-slate-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center active:translate-y-0.5 transition-all ease-in-out duration-100'>
                      Back
                    </button>
                    <button type='button' onClick={goToEmergencyPage} className='inline-block text-white bg-primary hover:bg-primary-dark active:translate-y-0.5 transition-all ease-in-out duration-100  font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {page3 && (
          // EMERGENCY CONTACT PAGE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!################
          <>
            <div className='bg-greybg h-screen w-screen'>
              <div className='py-[60px]'>
                <div className='bg-white shadow-2xl rounded-t-[1rem] w-[940px] h-[560px] mx-[280px]'>
                  <div className='px-[50px] py-[30px]'>
                    <div className='flex space-x-5'>
                      <div className='inline-block mb-5'>
                        <div className='text-xs text-primary'>1. Personal Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-primary'></div>
                      </div>
                      <div className='inline-block'>
                        <div className='text-xs text-primary'>2. Additional Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-primary'></div>
                      </div>
                      <div className='inline-block'>
                        <div className='text-xs text-primary'>3. Emergency Contact Details</div>
                        <div className='rounded-full w-[260px] h-[5px] bg-primary'></div>
                      </div>
                    </div>

                    <div className='font-bold text-3xl mb-5'>Emergency Contact Details</div>
                    <div className='font-light'>
                      <p className='inline-block text-red-600'>*</p>
                      <p className='inline-block'>‎ ‎ ‎ ‎ ‎‎ Indicates required field</p>
                    </div>

                    <div className='grid gap-3 md:grid-cols-2'>
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
                  <div className='bg-slate-100 py-5 rounded-b-[1rem] flex space-x-2 mt-[176px]'>
                    <button type='button' onClick={goToAdditionalPage} className='ml-[717.5px] inline-block border border-primary border-solid text-primary bg-white hover:bg-slate-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center active:translate-y-0.5 transition-all ease-in-out duration-100'>
                      Back
                    </button>
                    <button type='submit' className='inline-block text-white bg-primary hover:bg-primary-dark active:translate-y-0.5 transition-all ease-in-out duration-100 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center' /*disabled={!isValid}*/>
                      Finish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default Signup;
