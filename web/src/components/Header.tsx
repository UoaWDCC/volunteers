import { handleGoogle } from '../firebase/firebase.tsx';
// import AuthenticationContext from '../context/AuthenticationContext.tsx';
import AuthenticationContext from '../context/AuthenticationContext.tsx';
import { useContext } from 'react';
import { getUserById } from '@utils/UserService.ts';

function Header() {
  // const { signInUsingGoogle } = useContext(AuthenticationContext) || { signInUsingGoogle: undefined };
  // const authContext = useContext(AuthenticationContext) as AuthenticationContextProps;
  // const { signInUsingGoogle } = authContext;
  const authContext = useContext(AuthenticationContext);

  if (!authContext) {
    return null;
  }

  const { signInUsingGoogle, currentUser, signOut, userRole, getUserByStudentID } = authContext as { currentUser: { displayName: string }; signInUsingGoogle: () => void; signOut: () => void; userRole: string; setUserState: () => void; getUserByStudentID: (studentId: string) => void };
  const isUserLoggedIn = currentUser !== null;

  return (
    <header className='flex justify-center bg-neutral-tan'>
      <div className='flex flex-grow justify-between items-center min-w-min px-44 py-3'>
        <div>
          <img src='/public/assets/header-logo.svg' alt='Volunteers Club Logo' className='h-auto min-w-[150px]' />
        </div>

        <div>
          <ul className='flex flex-row text-sm text-white font-mono m-0 gap-5'>
            <li onClick={handleGoogle} className='px-[30px] py-[10px] bg-primary rounded-[2rem] hover:underline cursor-pointer'>
              Login
            </li>
            <li className='px-[30px] py-[10px] bg-primary rounded-[2rem] hover:underline cursor-pointer'>Register</li>
          </ul>
        </div>
      </div>
      {!isUserLoggedIn && <button onClick={signInUsingGoogle}>Sign In</button>}
      {isUserLoggedIn && <button onClick={signOut}>Sign Out</button>}
      <button onClick={() => console.log(currentUser)}>log currentUser</button>
      <div className='flex flex-col justify-center items-center'>
        {isUserLoggedIn && <h3>current user: {currentUser.displayName} </h3>}
        {isUserLoggedIn && <h3 className='inline'>user role: {userRole} </h3>}
        {isUserLoggedIn && (
          <h3 className='inline'>
            test:{' '}
            {(() => {
              getUserByStudentID('1234567');
              return 'User fetched';
            })()}
          </h3>
        )}
      </div>
    </header>
  );
}

export default Header;
