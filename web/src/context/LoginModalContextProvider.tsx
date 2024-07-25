import {useState} from "react";
import LoginModalContext from "./LoginModalContext";

import { ReactNode } from "react";

function LoginModalContextProvider({children}: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <LoginModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export default LoginModalContextProvider;