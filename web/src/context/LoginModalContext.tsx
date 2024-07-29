import { createContext } from 'react';

interface LoginModalContextType {
  showModal: boolean | null;
  setShowModal: Function;
}

const LoginModalContext = createContext<LoginModalContextType>({
  showModal: false,
  setShowModal: () => {},
});

export default LoginModalContext;