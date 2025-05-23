import React from 'react';

import type { AuthContext } from './AuthenticationContextProvider'; 

const AuthenticationContext = React.createContext<AuthContext | null>(null);

export default AuthenticationContext;
