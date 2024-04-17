import '../styles/componentStyles/UpcomingEvent.css';

const UpcomingEvent = () => {
    return ( 
        <div className="upcoming-event">
            <div className="event-info">
                <p className="event-name">Launch Night</p>
                <p className="event-date">Monday 8th April 2024</p>
                <p className="event-time">6:00pm - 8:00pm</p>
                <p className="event-type">Club Event</p>
            </div>
            <div className="button">
                <button>&gt;</button>
            </div>
        </div>
     );
}
 
export default UpcomingEvent;