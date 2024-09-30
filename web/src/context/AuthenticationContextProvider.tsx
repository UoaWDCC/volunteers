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
import { auth, db } from "../firebase/firebase";
import AuthenticationContext from "./AuthenticationContext";
import { ReactNode } from "react";
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
// import { collection, getDocs, getDoc, query, where, doc, DocumentData } from 'firebase/firestore';
import TokenContext from "./TokenContext";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export function useToken() {
  return useContext(TokenContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("" ?? "");
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
      setCurrentUser(user);
      setUserLoggedIn(true);
      setUserState(); // refreshing user state after reloading page and user is still logged in.
      const token = await user.getIdToken();
      setToken(token);

      // const { exists: uidExists } = await checkUidExists(user.uid); // logging user out of google if logged in but not in db (hasnt registered or finished registering)
      // if (!uidExists) {
      //   console.log('User not found in db, redirecting to register page');
      //   signOut();
      // }
      const { exists, userDetails } = await checkUidExists(user.uid);
      if (exists && userDetails) {
        setFirestoreUserDetails(userDetails);
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  /* 
    use this function to sign in with google popup. it will check if the user exists in the firestore user collection, if not it
    will redirect to the register page
  */
  async function signInUsingGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const { exists: uidExists, userDetails } = await checkUidExists(user.uid);
      console.log(
        "uid for user:",
        user.displayName,
        "exists in Firestore:",
        uidExists
      );

      if (!uidExists) {
        window.location.href = "register";
        console.log("user not exists");
      } else {
        console.log("uid found in db, firestore user details:", userDetails);
        window.location.href = "dashboard";
        if (userDetails) {
          setFirestoreUserDetails(userDetails);
          console.log("Signed in with user email: ", userDetails.email);
        }
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
      const appUrl = import.meta.env.VITE_APP_URL;
      const port = import.meta.env.VITE_APP_PORT;

      const response = await axios.get(`${appUrl}:${port}/api/users/${uid}`);

      if (response.status === 200) {
        console.log("user exists in Firestore with UID:", uid);
        return { exists: true, userDetails: response.data };
      } else {
        console.error("User not found with UID:", uid);
        return { exists: false, userDetails: undefined };
      }
    } catch (error) {
      console.error("Error checking user UID via API:", error);
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
      const appUrl = import.meta.env.VITE_APP_URL;
      const port = import.meta.env.VITE_APP_PORT;

      const response = await axios.get(`${appUrl}:${port}/api/users`);

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
  };

  return (
    <AuthenticationContext.Provider value={contextValue as any}>
      <TokenContext.Provider value={token}>
        {!loading && children}
      </TokenContext.Provider>
    </AuthenticationContext.Provider>
  );
}

export default AuthProvider;
