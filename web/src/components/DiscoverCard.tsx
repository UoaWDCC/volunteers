import '../styles/componentStyles/DiscoverCard.css';

const DiscoverCard = () => {
    return ( 
        <div className="card">
            <div className="details">
                <h2>Produce Packer</h2>
                <p>Company</p>
                <p>Day</p>
                <p>Time</p>
                <p>Hours</p>
            </div>
            <button className="more-info">
                More info
            </button>
        </div>
     );
}
 
export default DiscoverCard;