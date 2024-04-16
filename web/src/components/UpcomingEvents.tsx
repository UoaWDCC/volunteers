import '../styles/componentStyles/UpcomingEvents.css';
import UpcomingEvent from './UpcomingEvent';

const UpcomingEvents = () => {
    return ( 
        <div className="upcoming-events">
            <div className="heading">
                <p className='header'>Upcoming Events</p>
                <p className='below-header'>See what's going on!</p>
            </div>
            <div className="events">
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
                <UpcomingEvent/>
            </div>
        </div>
     );
}
 
export default UpcomingEvents;