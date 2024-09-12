import { useContext } from 'react';
import ProfileEditModalContext from '../context/ProfileEditModalContext';

const ProfileEditModal = () => {
    const { showModal, setShowModal } = useContext(ProfileEditModalContext);
    const baseBackgroundStyle = 'fixed z-[500] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 ';
    return ( 
    <div
      id='modalBackground'
      className={showModal ? baseBackgroundStyle + 'opacity-100 visible' : baseBackgroundStyle + 'opacity-0 invisible'}
      onClick={(e) => {
        if (e.target == document.getElementById('modalBackground')) {
          setShowModal(false);
        }
      }}
    >
        <h1>hi</h1>


    </div>
     );
}
 
export default ProfileEditModal;