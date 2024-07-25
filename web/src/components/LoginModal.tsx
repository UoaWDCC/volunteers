import { useContext } from 'react';
import LoginModalContext from '../context/LoginModalContext';

const LoginModal = () => {
    const { showModal, setShowModal } = useContext(LoginModalContext);

    if (!showModal) {
        return null;
    }

    return ( 
        <div className='fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' onClick={() => setShowModal(false)}>
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