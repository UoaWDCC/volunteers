import "../styles/componentStyles/OurCommunity.css";

const OurCommunity = () => {

    return (
        <div className="community-section">
            {/*<img className="img1" src="../src/assets/gallery/events/sample1.png"/>*/}
            <div className="community-pics">
                <div className="community-pics-top">
                    <img className="community-img1" src="/assets/gallery/events/sample1.png" title="img1" alt="img1"/>
                    <img className="community-img2" src="/assets/gallery/events/sample3.png" title="img2" alt="img2"/>
                </div>
                <div className="community-pics-bottom">
                    <img className="community-img3" src="/assets/gallery/events/sample3.png" title="img3" alt="img3"/>
                    <img className="community-img4" src="/assets/gallery/events/sample4.png" title="img4" alt="img4"/>
                </div>
            </div>
            <div className="community-title">Our Community</div>
            <div className="community-description">
                Join our community to start tracking your efforts! 
                <br></br> 
                Create an account to log your hours, connect with others, and stay updated on our events. 
                With over:
            </div>
            <div className="community-number">1,200</div>
            <div className="community-description2">volunteers in our club</div>
            <button className="community-signup">Sign me up</button>
        </div>
    );
}
export default OurCommunity;
