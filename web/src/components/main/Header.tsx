import AuthenticationContext from '../../context/AuthenticationContext.tsx';
import { useContext, useState, useEffect } from 'react';
import LoginModalContext from '../../context/LoginModalContext.tsx';
//import { useLocation } from 'react-router-dom';

function Header() {
  const { setShowModal } = useContext(LoginModalContext);
  const authContext = useContext(AuthenticationContext);
  //const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  const { signOut, isUserLoggedIn, firestoreUserDetails } = 
    authContext as unknown as { 
      signOut: () => void; 
      isUserLoggedIn: boolean;
      firestoreUserDetails: any;
    };

  useEffect(() => {
    // Create an observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Triggers when section is in middle of viewport
        threshold: 0
      }
    );

    // Observe all sections
    const sections = ['gallery', 'about', 'events'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (!authContext) {
    return null;
  } 

  const isFullyLoggedIn = isUserLoggedIn && firestoreUserDetails;

  const goToDashboard = () => {
    window.location.href = '/dashboard';
  }

  return (
    <header className='sticky top-0 z-[100] flex justify-between items-center bg-white/95 backdrop-blur-sm px-24 py-6 shadow-md'>
      {/* Left - Logo */}
      <div className="flex-none">
        <img src='/public/assets/header-logo.svg' alt='Volunteers Club Logo' className='h-12' />
      </div>

      {/* Center - Navigation */}
      <div className="flex-1 flex justify-center">
        <div className="relative bg-neutral-tan rounded-full px-8 py-3">
          <nav className="flex gap-16">
            <a href="#gallery" className="relative">
              <span className="text-gray-700 font-medium hover:text-primary transition-colors">Gallery</span>
              {activeSection === 'gallery' && (
                <div className="absolute w-full h-1 bg-primary rounded-full bottom-[-12px] transition-all duration-300" />
              )}
            </a>
            <a href="#about" className="relative">
              <span className="text-gray-700 font-medium hover:text-primary transition-colors">About</span>
              {activeSection === 'about' && (
                <div className="absolute w-full h-1 bg-primary rounded-full bottom-[-12px] transition-all duration-300" />
              )}
            </a>
            <a href="#events" className="relative">
              <span className="text-gray-700 font-medium hover:text-primary transition-colors">Events</span>
              {activeSection === 'events' && (
                <div className="absolute w-full h-1 bg-primary rounded-full bottom-[-12px] transition-all duration-300" />
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