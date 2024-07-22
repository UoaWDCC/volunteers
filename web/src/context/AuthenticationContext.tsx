// import React from "react";

// const AuthenticationContext = React.createContext(null);

// export default AuthenticationContext;

import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface AuthenticationContextProps {
  getUserIdToken: () => Promise<string | null>;
  loading: boolean;
  user: User | null;
  error: Error | null;
  signOut: () => void;
  signInUsingGoogle: () => void;
  CustomUser: {
    firebaseUserObj: User | null;
    role: any; // Specify the type if possible
  };
}

const AuthenticationContext = createContext<AuthenticationContextProps | null>(null);

export default AuthenticationContext;
