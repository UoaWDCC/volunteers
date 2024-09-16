import { useContext } from 'react';
import LoginModalContext from '../../context/LoginModalContext.tsx';
import AuthenticationContext from '../../context/AuthenticationContext.tsx';

const LoginModal = () => {
  const { showModal, setShowModal } = useContext(LoginModalContext);
  const authContext = useContext(AuthenticationContext);
  const { signInUsingGoogle, isUserLoggedIn } = authContext as unknown as { signInUsingGoogle: () => void; isUserLoggedIn: boolean };

  if (!authContext) {
    return null;
  }

  if (isUserLoggedIn) {
    setShowModal(false);
  }

  const baseBackgroundStyle = 'fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 ';

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
      <div className='relative w-[940px] h-[560px] mt- m-0 rounded-3xl bg-white flex justify-between items-center'>
        <img src='/assets/loginModal/closeButton.png' className='absolute top-[2%] right-[2%] mt-[20px] mr-[20px] transition-opacity cursor-pointer opacity-100 hover:opacity-80' onClick={() => setShowModal(false)} />

        <div className='w-1/2 px-[55px] flex flex-col'>
          <img src='/assets/club-logo.svg' className='self-center mb-[50px] mt-[-90px]' />

          <h2 className='fontFamily-sans font-bold'>Log in or sign up</h2>
          <p className='fontFamily-sans text-[14px]'>Track your hours, stay updated on events, and join our community of dedicated volunteers!</p>

          <button onClick={signInUsingGoogle} className='w-[345px] h-[45px] mt-[30px] flex justify-start items-center rounded-lg bg-transparent border-2 border-solid border-lightGrey transition-colors active:bg-lightGrey'>
            <img src='/assets/loginModal/googleIcon.png' className='w-[35px] h-[35px]' />
            <p className='fontFamily-sans font-semibold text-black text-[16px] ml-[40px] mt-[15px]'>Continue with Google</p>
          </button>
        </div>

        <div className='w-1/2'>
          <img src='/assets/loginModal/sideImage.png' className='w-[470px] h-[560px] ' />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
