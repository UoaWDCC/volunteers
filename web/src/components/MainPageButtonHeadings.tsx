interface Props {
    heading?: string;
    onClick?: () => void;
  }

  const MainPageButtonHeadings: React.FC<Props> = ({ heading = 'defaultText', onClick }) => {
    const defaultOnClick = () =>{
        console.log('default action');
    };
    return(
        <div className='flex justify-center items-center border border-black rounded-[30px] text-section-header font-serif w-full h-auto sm:w-[304px] sm:h-[67px] cursor-pointer' onClick={onClick || defaultOnClick}>
            {heading}
        </div>
    );
}


export default MainPageButtonHeadings