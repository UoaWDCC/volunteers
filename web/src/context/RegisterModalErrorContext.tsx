import { createContext } from 'react';

interface RegisterModalErrorContextType {
  showModal: boolean | null;
  setShowModal: Function;
  error: string;
    setError: Function;
    message: string;
    setMessage: Function;
    missingFields: string[];
    setMissingFields: Function;
}

const RegisterModalErrorContext = createContext<RegisterModalErrorContextType>({
  showModal: false,
  setShowModal: () => {},
  error: '',
    setError: () => {},
    message: '',
    setMessage: () => {},
    missingFields: [],
    setMissingFields: () => {},

});

export default RegisterModalErrorContext;