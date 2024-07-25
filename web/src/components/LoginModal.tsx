import { useContext } from 'react';
import LoginModalContext from '../context/LoginModalContext';

const LoginModal = () => {
    const { showModal } = useContext(LoginModalContext);

    if (!showModal) {
        return null;
    }

    return ( 
        <div>
            <div>
                <div>
                    <h1>Log in or sign up</h1>
                </div>
                <div>
                    <h2>Insert image here</h2>
                </div>
            </div>
        </div>
     );
}
 
export default LoginModal;