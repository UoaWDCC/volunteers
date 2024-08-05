=======
import AuthenticationContext from '../context/AuthenticationContext.tsx';
import { useContext } from 'react';
import LoginModalContext from '../context/LoginModalContext.tsx';

function Header() {
  const { setShowModal } = useContext(LoginModalContext);
  const authContext = useContext(AuthenticationContext);
  const { signOut, isUserLoggedIn } = authContext as unknown as { signOut: () => void; isUserLoggedIn: boolean };

  if (!authContext) {
    return null;
  }

  return (
    <header className='flex justify-center bg-neutral-tan'>
      <div className='flex flex-grow justify-between items-center min-w-min px-44 py-3'>
        <div>
          <img src='/public/assets/header-logo.svg' alt='Volunteers Club Logo' className='h-auto min-w-[150px]' />
        </div>

        <div>
          <ul className='flex flex-row text-sm text-white font-mono m-0 gap-5'>
            {!isUserLoggedIn && (
              <>
                <li
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className='px-[30px] py-[10px] rounded-[2rem] bg-primary font-mono cursor-pointer hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100'
                >
                  Login
                </li>
                <li
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className='px-[30px] py-[10px] bg-primary rounded-[2rem] hover: cursor-pointer hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100'
                >
                  Register
                </li>
              </>
            )}
            {isUserLoggedIn && (
              <li onClick={signOut} className='px-[30px] py-[10px] bg-primary rounded-[2rem] hover: cursor-pointer hover:bg-primary-dark hover:text-[#f7f7fb] active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100'>
                Sign Out
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
