import { ReactNode, useContext } from "react";
import TokenContext from "./TokenContext";
export const useToken = () => {
  return useContext(TokenContext);
}

export const TokenContextProvider = ({ children } : {children:ReactNode}) => {
  const token = useToken();
  return (
    <TokenContext.Provider value={token}>
      { children }
    </TokenContext.Provider>
  )
}   
