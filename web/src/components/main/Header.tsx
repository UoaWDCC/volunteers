import AuthenticationContext from '../../context/AuthenticationContext.tsx';
import { useContext } from 'react';
import LoginModalContext from '../../context/LoginModalContext.tsx';
import { useLocation } from 'react-router-dom';

function Header() {
  const { setShowModal } = useContext(LoginModalContext);
  const authContext = useContext(AuthenticationContext);
  const location = useLocation();
  const { signOut, isUserLoggedIn, firestoreUserDetails } = 
    authContext as unknown as { 
      signOut: () => void; 
      isUserLoggedIn: boolean;
      firestoreUserDetails: any;
    };

  if (!authContext) {
    return null;
  } 

  const isFullyLoggedIn = isUserLoggedIn && firestoreUserDetails;

  const goToDashboard = () => {
    window.location.href = '/dashboard';
  }

  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('about')) return 'about';
    if (path.includes('events')) return 'events';
    if (path.includes('community')) return 'community';
    return '';
  }

  return (
    <header className='sticky top-0 z-40 flex justify-between items-center bg-white/95 backdrop-blur-sm px-24 py-6 shadow-md'>
      {/* Left - Logo */}
      <div className="flex-none">
        <img src='/public/assets/header-logo.svg' alt='Volunteers Club Logo' className='h-12' />
      </div>

      {/* Center - Navigation */}
      <div className="flex-1 flex justify-center">
        <div className="relative bg-neutral-tan rounded-full px-8 py-3">
          <nav className="flex gap-16">
            <a href="/about" className="relative">
              <span className="text-gray-700 font-medium hover:text-primary transition-colors">About</span>
              {getCurrentSection() === 'about' && (
                <div className="absolute w-full h-1 bg-primary rounded-full bottom-[-12px]" />
              )}
            </a>
            <a href="/events" className="relative">
              <span className="text-gray-700 font-medium hover:text-primary transition-colors">Events</span>
              {getCurrentSection() === 'events' && (
                <div className="absolute w-full h-1 bg-primary rounded-full bottom-[-12px]" />
              )}
            </a>
            <a href="/community" className="relative">
              <span className="text-gray-700 font-medium hover:text-primary transition-colors">Community</span>
              {getCurrentSection() === 'community' && (
                <div className="absolute w-full h-1 bg-primary rounded-full bottom-[-12px]" />
              )}
            </a>
          </nav>
        </div>
      </div>

      {/* Right - Auth Buttons */}
      <div className="flex-none">
        {!isFullyLoggedIn ? (
          <button
            onClick={() => setShowModal(true)}
            className='px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100'
          >
            Login
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={goToDashboard}
              className='px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100'
            >
              Dashboard
            </button>
            <button
              onClick={signOut}
              className='px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark active:bg-[#264268] active:translate-y-0.5 transition-all ease-in-out duration-100'
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;