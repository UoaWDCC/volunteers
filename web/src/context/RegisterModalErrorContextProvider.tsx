import {useState} from "react";
import RegisterModalErrorContext from "./RegisterModalErrorContext";

import { ReactNode } from "react";

function RegisterModalErrorContextProvider({children}: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const contextValue = { showModal, setShowModal, error, setError, message, setMessage, missingFields, setMissingFields };
  return (
    <RegisterModalErrorContext.Provider value={contextValue as any}>
      {children}
    </RegisterModalErrorContext.Provider>
  );
}

export default RegisterModalErrorContextProvider;