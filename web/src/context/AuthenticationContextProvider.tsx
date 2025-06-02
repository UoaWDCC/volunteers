/*
INFORMATION:
- This file is the context provider for the authentication context and provides the context to the rest of the application.

- To use the context provider, wrap its TSX element around the component you want to provide context to.
  Example: <AuthenticationContextProvider> <example component(s)/> </AuthenticationContextProvider>
  Currently, this is done in the MainMenu component.

- To avoid unexpected behavior from this file, make sure to enforce signing out before singing in with a new account. Enforce
  this behavior in components that use this context provider.

- When singing in with signInUsingGoogle(), Google's API returns a Google user object containing some of the following info:
  accessToken, displayName, email, emailVerified, uid (uid is the Google's unique identifier for the user). This object is
  used to assign state to the variables in this file, then this info can be used to write a user to the db.
  
- Users in our firestore db should have a uid attribute in the user schema that matches the uid from the Google user object.

- The constant "currentUser" is the Google user object, NOT the user object from the firestore db.

- Using getGoogleUserByStudentID() will return a user object from the firestore db users collection based on the studentID as
  opposed to the Google user object.
*/
import axios from "axios";
import { signInWithPopup, User, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AuthenticationContext from "./AuthenticationContext";
import { ReactNode } from "react";
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { collection, getDocs, getDoc, query, where, doc, DocumentData } from 'firebase/firestore';
import TokenContext from "./TokenContext";
import { DocumentData } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export function useToken() {
  return useContext(TokenContext);
}

// ============================= Inline type definition ============================= //
// This type defines the shape of the authentication context value
// so TypeScript knows what properties are available when calling useAuth().
// It enables autocomplete and prevents errors like 'property does not exist on type null'.
export type AuthContext = {
  currentUser: User | null;
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  userRole: string;
  isUserLoggedIn: boolean;
  loading: boolean;
  error: Error | null;
  signInUsingGoogle: () => void;
  signOut: () => void;
  getFirestoreCollectionUserByStudentID: (studentID: string) => Promise<DocumentData | null>;
  firestoreUserDetails: DocumentData | null;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [firestoreUserDetails, setFirestoreUserDetails] =
    useState<DocumentData | null>(null);
  // checks UID corresponding with email
  interface CheckUidResult {
    exists: boolean;
    userDetails: DocumentData | undefined;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  // update user role based on email whenever email is changed
  useEffect(() => {
    if (email) {
      if (email == "volunteers@projects.wdcc.co.nz") {
        setUserRole("admin");
      } else {
        setUserRole("volunteer");
      }
    }
  }, [email]);

  async function initializeUser(user: User | null) {
    if (user) {
      console.log(user);
      const token = await user.getIdToken();
      setToken(token);

      const { exists, userDetails } = await checkUidExists(user.uid);
      if (exists && userDetails) {
        setCurrentUser(user);
        setUserLoggedIn(true);
        setUserState();
        setFirestoreUserDetails(userDetails); // Now TypeScript knows userDetails is DocumentData
      } else {
        // User is authenticated with Google but hasn't completed registration
        setCurrentUser(user);
        setUserLoggedIn(false);
        setUserState();
        setFirestoreUserDetails(null); // Explicitly set to null when no details exist
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setFirestoreUserDetails(null);
    }
    setLoading(false);
  }

  async function signInUsingGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      const { exists: uidExists, userDetails } = await checkUidExists(user.uid);
      
      setCurrentUser(user);
      await setUserState();

      if (!uidExists || !userDetails) { // Check for both exists and userDetails
        console.log("User not registered, redirecting to register");
        setUserLoggedIn(false);
        setFirestoreUserDetails(null); // Explicitly set to null
        window.location.href = "register";
      } else {
        console.log("User found in db, proceeding to dashboard");
        setUserLoggedIn(true);
        setFirestoreUserDetails(userDetails);
        window.location.href = "dashboard";
        return userDetails;
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  }

  /* 
    this function can check for a users UID in the firestore user collection OR firestore document, these are two different things
    i think it would be better to check in the collection since thats what we can see in the firestore database console website
    the function is set up to check for either, comment out the one you dont want to use
  */
  const checkUidExists = async (uid: string): Promise<CheckUidResult> => {
    // !!!!!!!!!!!!!!!!!!!!!! CHECKING UID IN FIRESTORE DOCUMENT
    // checking uid in firestore document im not really sure what "document" is, currently the register form is set up to write to
    // "document" and not "collection" so uids uploaded to "document" will not be in the collection and vice versa. Probably
    // something we would want to look into.
    // const userDoc = doc(db, 'users', uid);
    // try {
    //   console.log(`Checking uid: ${uid}`);
    //   const docSnapshot = await getDoc(userDoc);
    //   return { exists: docSnapshot.exists(), userDetails: docSnapshot.data() };
    // } catch (error) {
    //   console.error('Error checking user UID in Firestore:', error);
    //   return { exists: false, userDetails: undefined };
    // }
    // !!!!!!!!!!!!!!!!!!!!!! CHECKING UID IN FIRESTORE COLLECTION
    try {
      const appUrl = import.meta.env.VITE_API_URL;

      const response = await axios.get(`${appUrl}/api/users/${uid}`);
      
      if (response.status === 200) {
        console.log("user exists in Firestore with UID:", uid);
        return { exists: true, userDetails: response.data };
      } else {
        console.error("User not found with UID:", uid);
        return { exists: false, userDetails: undefined };
      }
    } catch (error) {
      console.error("Error checking user UID via API:", error);
      setUserLoggedIn(false);
      setCurrentUser(null);
      return { exists: false, userDetails: undefined };
    }
  };

  function signOut() {
    try {
      auth.signOut();
      setUserLoggedIn(false);
      setCurrentUser(null);
    } catch (error) {
      setError(error as Error);
      console.error("Error signing out:", error);
    }
  }

  /*
    use this to refresh or set the user attributes and use before any backend fetch
  */
  async function setUserState() {
    try {
      // setting values from google sign in to firstname last name email uid
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user);
        setEmail(user.email || "");
        setUid(user.uid || "");
        const displayName = user.displayName || "";
        const nameParts = displayName.split(" ");
        setFirstName(nameParts[0]);
        setLastName(nameParts.slice(1).join(" "));
        console.log("User state set");
      }
    } catch (error) {
      setError(error as Error);
      console.error("Error retrieving user info:", error);
    }
  }

  /* 
    this function returns a user's JSON data from the firestore user collection based on the studentID
    this does NOT return the user's google user object, only the user's data from the firestore db
  */
  async function getFirestoreCollectionUserByStudentID(
    studentID: string
  ): Promise<DocumentData | null> {
    try {
      const appUrl = import.meta.env.VITE_API_URL;

      const response = await axios.get(`${appUrl}/api/users`);

      if (response.status === 200 && response.data.length > 0) {
        const users = response.data;
        const user = users.find((user: any) => user.studentID === studentID);

        if (user) {
          console.log(
            "User with studentID:",
            studentID,
            "exists in db users collection"
          );
          return user;
        } else {
          console.error(
            "User with studentID:",
            studentID,
            "does not exist in db users collection"
          );
          return null;
        }
      } else {
        console.error("No users found in db");
        return null;
      }
    } catch (error) {
      console.error("Error fetching users via API:", error);
      return null;
    }
  }

  const contextValue = {
    currentUser,
    firstName,
    lastName,
    email,
    uid,
    userRole,
    isUserLoggedIn,
    loading,
    error,
    signInUsingGoogle,
    signOut,
    getFirestoreCollectionUserByStudentID,
    firestoreUserDetails,
    setFirestoreUserDetails,
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      <TokenContext.Provider value={token}>
        {!loading && children}
      </TokenContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default AuthProvider;
