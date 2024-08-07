import '../styles/pageStyles/MainMenu.css';
import AuthenticationContextProvider from '../context/AuthenticationContextProvider';
import Signup from '../components/Signup';

function SignUpPage() {
  return (
    <div className='primary-background'>
      <AuthenticationContextProvider>
        <Signup />
      </AuthenticationContextProvider>
    </div>
  );
}

export default SignUpPage;
