import { useState } from "react";
import CommunitySearchContext from "./CommunitySearchContext";


export function CommunitySearchContextProvider({ children }: { children: React.ReactNode }) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const contextValue = {
        searchTerm,
        setSearchTerm,
    };

  return (
    <CommunitySearchContext.Provider value={contextValue as any}>
      {children}
    </CommunitySearchContext.Provider>
  );
}