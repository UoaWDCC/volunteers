import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
const googleProvider = new GoogleAuthProvider();
import AuthenticationContext from './AuthenticationContext';
import { useGetSimplified } from '../../context/crudHooks';

/**
 * This is a Context Provider made with the React Context API
 * AuthenticationContext grants access to functions and variables related to Firebase login
 */
import { ReactNode } from 'react';

export default function AuthenticationContextProvider({ children }: { children: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);

  /**
   * No idToken is stored in state to ensure the non-expired idToken is always used
   * @returns idToken or null if user is not signed in
   */
  async function getUserIdToken() {
    if (user) {
      const token = await user.getIdToken();
      return token;
    }

    return null;
  }

  function signInUsingGoogle() {
    signInWithPopup(auth, googleProvider);
  }

  function signOut() {
    auth.signOut();
  }

  // getting role from backend
  const [userRole, setUserRole] = useState();
  const userID = user == null ? 'null' : user.uid; // this is to avoid null pointer exceptions while confining to hook rules
  useGetSimplified(`/api/staff/${userID}`, setUserRole);

  // creating user object with role property
  const CustomUser = {
    firebaseUserObj: user,
    role: userRole,
  };

  return (
    <AuthenticationContext.Provider
      value={
        {
          getUserIdToken,
          loading,
          user,
          error,
          signOut,
          signInUsingGoogle,
          CustomUser, // can use different name
        } as any
      }
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
