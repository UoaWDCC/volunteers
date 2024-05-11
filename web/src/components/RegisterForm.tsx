import React, { useState, FormEvent } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Initialize Firestore and Firebase Auth
const db = getFirestore();
const auth = getAuth();

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [dietaryRequirements, setDietaryRequirements] = useState<string>('');
  const [accessibilityRequirements, setAccessibilityRequirements] = useState<string>('');
  const [fullLicense, setFullLicense] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid; // Get the UID from the current logged-in user
      const userDoc = doc(db, "users", uid); // Specify the path with UID as the document ID

      try {
        await setDoc(userDoc, {
          firstName,
          lastName,
          email,
          mobile,
          birthdate,
          gender,
          dietaryRequirements,
          accessibilityRequirements,
          fullLicense
        }, { merge: true }); // Using merge option to avoid overwriting if the doc exists
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    } else {
      console.log("No user logged in");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h3>Register User</h3>
      <input placeholder='First Name...' value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder='Last Name...' value={lastName} onChange={e => setLastName(e.target.value)} />
      <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <input type='tel' placeholder='Mobile' value={mobile} onChange={e => setMobile(e.target.value)} />
      <input type='date' value={birthdate} onChange={e => setBirthdate(e.target.value)} />
      <select name="gender" value={gender} onChange={e => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="Non-Binary">Non-Binary</option>
        <option value="Prefer not to say">Prefer not to say</option>
        <option value="other">Other</option>
      </select>
      <select name="dietary requirements" value={dietaryRequirements} onChange={e => setDietaryRequirements(e.target.value)}>
        <option value="">Select Dietary Requirements</option>
        <option value="none">None</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="halal">Halal</option>
      </select>
      <select name="accessibilityRequirements" value={accessibilityRequirements} onChange={e => setAccessibilityRequirements(e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select name="fullLicense" value={fullLicense} onChange={e => setFullLicense(e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
