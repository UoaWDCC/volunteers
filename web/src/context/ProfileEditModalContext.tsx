import { createContext } from 'react';

interface ProfileEditModalContextType {
  showModal: boolean | null;
  setShowModal: Function;
}

const ProfileEditModalContext = createContext<ProfileEditModalContextType>({
  showModal: false,
  setShowModal: () => {},

});

export default ProfileEditModalContext;