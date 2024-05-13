import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';


const firebaseConfig = {
  apiKey:"AIzaSyBox7z0b2SBEnz0v6qmQjFx3QfUJcG099U",
  authDomain:"volunteerclub-14b7a.firebaseapp.com",
  projectId:"volunteerclub-14b7a",
  storageBucket:"volunteerclub-14b7a.appspot.com",
  messagingSenderId:"765497707892",
  appId:"1:765497707892:web:d1fb4e8f77881366037021",
  measurementId:"G-TLM9P3DCKS",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

// Export Firebase authentication service
export const auth = getAuth(app);

//checks UID corresponding with email
interface CheckUidResult {
  exists: boolean;
  userDetails: DocumentData | undefined;
}

export const checkUidExists = async (uid: string): Promise<CheckUidResult> => {
  const userDoc = doc(db, 'users', uid);
  try {
    const docSnapshot = await getDoc(userDoc);
    return { exists: docSnapshot.exists(), userDetails: docSnapshot.data() };
  } catch (error) {
    console.error("Error checking user UID in Firestore:", error);
    return { exists: false, userDetails: undefined };
  }
}

//google sign in authentication
export const handleGoogle = async () => {
  const provider = await new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const { exists: uidExists, userDetails } = await checkUidExists(user.uid);
    console.log('UID exists in Firestore:', uidExists);

    if (!uidExists) {
      window.location.href = 'register';
    } else {
      console.log("user exists", userDetails);  
      return userDetails ;
    }
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
}
