/*
INFORMATION:
- This file is the context provider for the authentication context and provides the context to the rest of the application.

- To use the context provider, wrap its TSX element around the component you want to provide context to.
  Example: <AuthenticationContextProvider> <example component(s)/> </AuthenticationContextProvider>

- To avoid unexpected behavior from this file, make sure to enforce signing out before singing in with a new account. Enforce
  this behavior in components that use this context provider.

- When singing in with signInUsingGoogle(), Google's API returns a Google user object containing some of the following info:
  accessToken, displayName, email, emailVerified, uid (uid is the Google's unique identifier for the user). This object is
  used to assign state to the variables in this file, then a POST request is made to the backend to store the user in the db.
  
- Users in our firestore db should have a uid attribute in the user schema that matches the uid from the Google user object.
  This is not yet implemented because I couldnt get POST to work :(
*/

import { signInWithPopup, User, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import AuthenticationContext from './AuthenticationContext';
import { ReactNode } from 'react';
import { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthenticationContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('' ?? '');
  const [uid, setUid] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  // update user role based on email
  useEffect(() => {
    if (email) {
      if (email.endsWith('@gmail.com') || email.endsWith('@projects.wdcc.co.nz')) {
        setUserRole('admin');
      } else {
        setUserRole('volunteer');
      }
    }
  }, [email]);

  async function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
      setUserState(); // refreshing user state after reloading page and user is still logged in.
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  async function signInUsingGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      await setUserState();
      // await postNewUser();
    } catch (err) {
      setError(err as Error);
      console.error('Error signing in:', err);
    }
  }

  function signOut() {
    try {
      auth.signOut();
      setUserLoggedIn(false);
      setCurrentUser(null);
    } catch (error) {
      setError(error as Error);
      console.error('Error signing out:', error);
    }
  }

  // use this to refresh or set the user attributes and use before any backend fetch
  async function setUserState() {
    try {
      // setting values from google sign in to firstname last name email uid
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user);
        setEmail(user.email || '');
        setUid(user.uid || '');
        const displayName = user.displayName || '';
        const nameParts = displayName.split(' ');
        setFirstName(nameParts[0]);
        setLastName(nameParts.slice(1).join(' '));
      }
    } catch (error) {
      setError(error as Error);
      console.error('Error retrieving user info:', error);
    }
  }

  // untested
  async function getUserByStudentID(studentID: string) {
    const colRef = collection(db, 'users');
    const q = query(colRef, where('studentID', '==', studentID));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('User exists in db');
      // fetch user datawith GET
      const response = await fetch(`http://localhost:3000/api/users/${studentID}`);
      const json = await response.json();
      console.log('json:', json);

      return json;
    } else {
      console.error('User does not exist in db');
      return null;
    }
  }

  // untetsted
  // !!!!!!!!!!!!!!!!   not sure why the POST does not work and if its just on my end or not   !!!!!!!!!
  // !!!!!!!!!!!!!!!!   IMPORTANT: must use setUserState before using this function to avoid unexpected behavior  !!!!!!!!!
  async function postNewUser() {
    // first check if user exists in db
    const colRef = collection(db, 'users');
    const dbUid = uid;
    const q = query(colRef, where('studentID', '==', dbUid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('Cannot create new user, user already exists');
      setError(new Error('Cannot create new user, user already exists'));
      return;
    }

    // putting user details into list to write to JSON then be posted to the db
    const user = auth.currentUser;
    if (user) {
      const dbUser = { firstName, lastName, email, uid, userRole };
      console.log('POSTING with user details:', user); // test if access to user logged in data from google

      // posting user details from google to the db
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          body: JSON.stringify(dbUser),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('response:', response);
        const json = await response.json();
        console.log('json:', json);

        if (!response.ok) {
          throw new Error(json.message);
        }

        if (response.ok) {
          console.log('User created successfully');
          setError(null);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
  }

  const contextValue = {
    currentUser,
    isUserLoggedIn,
    loading,
    error,
    signInUsingGoogle,
    signOut,
    userRole,
    getUserByStudentID,
  };

  return <AuthenticationContext.Provider value={contextValue as any}>{!loading && children}</AuthenticationContext.Provider>;
}

export default AuthProvider;
