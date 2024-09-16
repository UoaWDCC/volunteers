import {useState} from "react";
import ProfileEditModalContext from "./ProfileEditModalContext.tsx";

import { ReactNode } from "react";

function ProfileEditModalContextProvider({children}: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  const contextValue = { showModal, setShowModal };
  return (
    <ProfileEditModalContext.Provider value={contextValue as any}>
      {children}
    </ProfileEditModalContext.Provider>
  );
}

export default ProfileEditModalContextProvider;