import "../styles/componentStyles/Event.css"

export default function Event() {
    return (
        <div className="container">
            <div className="image-container">
                <img className="event-image" src="src/assets/gallery/events/sample1.png" />
            </div>
            <div className="text-container">
                <p className="date">SAT, 11 MAY</p>
                <h2 className="event-title">UoA Annual Volunteers Day</h2>
                <p className="location">The University of Auckland</p>
                <div className="people">
                    <img className="profile-image" src="src/assets/gallery/events/sample1.png" />
                    <p className="inline-text">Eduardo is interested</p>
                </div>
                <div className="people">
                    <img className="profile-image" src="src/assets/gallery/events/sample1.png" />
                    <img className="profile-image-special" src="src/assets/gallery/events/sample1.png" />
                    <p className="inline-text">John, May, and 4 other friends are going</p>
                </div>
            </div>
            
        </div>
    )
}