import { signInWithPopup, User, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import AuthenticationContext, { AuthenticationContextProps } from './AuthenticationContext';
import { useUserRole } from '../Hooks/useUserRole';
import { ReactNode } from 'react';
import { getUserById } from '@utils/UserService';

const googleProvider = new GoogleAuthProvider();

export default function AuthenticationContextProvider({ children }: { children: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);

  // Fetch user role using the custom hook
  // currently just gets undefined because its asking with null ID
  const userRole =  useUserRole(user ? user.uid : null);

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

  // Type assertion to ensure user is User | null
  const CustomUser = {
    firebaseUserObj: user as User | null,
    role: userRole,
  };

  const contextValue: AuthenticationContextProps = {
    getUserIdToken,
    loading,
    user: user as User | null,
    error: error || null,
    signOut,
    signInUsingGoogle,
    CustomUser,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}
