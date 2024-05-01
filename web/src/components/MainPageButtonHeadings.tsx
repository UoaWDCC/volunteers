import '../styles/componentStyles/MainPageButtonHeadings.css'

interface Props {
    heading?: string;
    onClick?: () => void;
  }

  const MainPageButtonHeadings: React.FC<Props> = ({ heading = 'defaultText', onClick }) => {
    const defaultOnClick = () =>{
        console.log('default action');
    };
    return(
        <div className='buttonContainer'>
            <button className = 'buttonHeading' onClick={onClick || defaultOnClick}>
                {heading}
            </button>
        </div>
    );
}


export default MainPageButtonHeadings