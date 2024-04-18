import '../styles/componentStyles/MainPageButtonHeadings.css'

const MainPageButtonHeadings = ({heading = 'defaultText', onClick}) =>{
    // default onClick function
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