import "../styles/componentStyles/OurAchievements.css";

const OurAchievements = () => {
    return (
        <div className="achievements-section">
            <div className="achievements-title">Our Achievements</div>
            <div className="achievements">

                <img className="imgSides" src="/assets/gallery/events/sample1.png" title="img1" alt="img1"/>

                <div className="achievement-text">
                    <p className="achievement-name">Relay for life:</p>
                    <p className="award-name">Silver Award</p>
                    <p className="achievement-stats">$8,043</p>
                    <p className="achievement-name">raised</p>
                </div>

                <img className="imgMiddle" src="/assets/gallery/events/sample3.png" title="img2" alt="img2"/>

                <div className="achievement-text">
                    <p className="achievement-name">UoA Clubs Awards:</p>
                    <p className="award-name">Runner Up</p>
                    <p className="achievement-stats">2023</p>
                    <p className="achievement-name">Cause of the Year</p>
                </div>

                <img className="imgSides" src="/assets/gallery/events/sample4.png" title="img3" alt="img3"/>
            </div>
        </div>
    );
}
export default OurAchievements;
