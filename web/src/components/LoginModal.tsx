import { useContext } from 'react';
import LoginModalContext from '../context/LoginModalContext';
import { handleGoogle } from '../firebase/firebase';

const LoginModal = () => {
    const { showModal, setShowModal } = useContext(LoginModalContext);

    if (!showModal) {
        return null;
    }

    return ( 
        <div id='modalBackground' className='fixed z-[100] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center' onClick={(e) => {if (e.target == document.getElementById("modalBackground")) {setShowModal(false)}}}>
            <div className='w-[940px] h-[560px] m-0 rounded-3xl bg-white flex justify-between items-center'>

                <img src='/assets/loginModal/closeButton.png' className='absolute top-[70px] right-[290px] mt-[20px] mr-[20px]' onClick={() => setShowModal(false)} />
                
                <div className='w-1/2 px-[55px] flex flex-col'> 
                    <img src='/assets/club-logo.svg' className='self-center mb-[50px] mt-[-90px]' />

                    <h2 className='fontFamily-sans font-bold'>Log in or sign up</h2>
                    <p className='fontFamily-sans text-[14px]'>Track your hours, stay updated on events, and join our community of dedicated volunteers!</p>

                    <button className='w-[345px] h-[45px] mt-[30px] flex justify-start items-center rounded-lg bg-transparent border-2 border-solid border-lightGrey'> 
                        <img src='/assets/loginModal/googleIcon.png' className='w-[35px] h-[35px]' />
                        <p onClick={handleGoogle} className='fontFamily-sans font-semibold text-black text-[16px] ml-[40px] mt-[15px]'>Continue with Google</p>
                    </button>
                </div>

                <div className='w-1/2'>
                    <img src='/assets/loginModal/sideImage.png' className='w-[470px] h-[560px] '/>
                </div>
            </div>
        </div>
     );
}
 
export default LoginModal;