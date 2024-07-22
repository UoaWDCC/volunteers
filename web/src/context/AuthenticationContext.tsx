import React from "react";
import AccessLevel from "../enums/route.access.level";
// Define the type for the context
interface AuthContextType {
    loading: boolean;
    user: User | null;
    VolUser: { role: typeof AccessLevel[keyof typeof AccessLevel] } | null;
  }
  
  interface User {
    email: string;
  }
  
  // Create a default context value
  const defaultAuthContext: AuthContextType = {
    loading: false,
    user: null,
    VolUser: null,
  };
  
  // Create the context
  const AuthenticationContext = React.createContext<AuthContextType>(defaultAuthContext);
  
  export default AuthenticationContext;
  