import { useState, useEffect, useContext, useMemo } from 'react';
import AuthenticationContext from '../../../context/AuthenticationContext';
import {
    Calendar,
    dateFnsLocalizer,
    Event as RBCEvent,
    ToolbarProps,
    View,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enNZ } from 'date-fns/locale/en-NZ';
import { getFirestore, collection, query, where, getDocs, doc } from 'firebase/firestore';

const locales = {
    'en-NZ': enNZ,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

interface Event {
    id: string;
    event_title: string;
    start_date_time: Date;
    end_date_time: Date;
    location: string;
    description: string;
}

export default function DashboardCalendar() {
    const [userEvents, setUserEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Get user context
    const authContext = useContext(AuthenticationContext);
    const { uid } = authContext as unknown as { uid: string };

    const db = getFirestore();

    useEffect(() => {
        if (uid) {
            fetchUserEvents();
        }
    }, [uid]);

    const fetchUserEvents = async () => {
        try {
            setLoading(true);
            setError(null);

            // First, find the user's document ID in the users collection
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('uid', '==', uid));
            const userSnapshot = await getDocs(userQuery);
            
            if (userSnapshot.empty) {
                setUserEvents([]);
                setLoading(false);
                return;
            }
            
            const userDocId = userSnapshot.docs[0].id;
            
            // Get user's event registrations from event_attendance collection
            const attendanceRef = collection(db, 'event_attendance');
            const attendanceQuery = query(
                attendanceRef, 
                where('uid', '==', doc(db, 'users', userDocId))
            );
            const attendanceSnapshot = await getDocs(attendanceQuery);
            
            if (attendanceSnapshot.empty) {
                setUserEvents([]);
                setLoading(false);
                return;
            }
            
            // Get event details for each registration
            const eventsRef = collection(db, 'events');
            const eventsSnapshot = await getDocs(eventsRef);
            const allEvents: Event[] = [];
            
            eventsSnapshot.forEach((doc) => {
                const data = doc.data();
                allEvents.push({
                    id: doc.id,
                    event_title: data.event_title,
                    start_date_time: data.start_date_time.toDate(),
                    end_date_time: data.end_date_time.toDate(),
                    location: data.location,
                    description: data.description
                });
            });
            
            // Match registrations with events
            const userRegisteredEvents = allEvents.filter(event => 
                attendanceSnapshot.docs.some(attendance => {
                    const attendanceData = attendance.data();
                    return attendanceData.eventId?.path?.includes(event.id);
                })
            );

            setUserEvents(userRegisteredEvents);
        } catch (err) {
            console.error('Error fetching user events:', err);
            setError('Failed to load your events');
        } finally {
            setLoading(false);
        }
    };

    // Map events to react-big-calendar format
    const calendarEvents: RBCEvent[] = useMemo(() =>
        userEvents.map(event => ({
            id: event.id,
            title: event.event_title,
            start: event.start_date_time,
            end: event.end_date_time,
            allDay: false,
            resource: event,
        })),
        [userEvents]
    );

    if (loading) {
        return (
            <div className="w-[96%] h-screen rounded bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your events...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[96%] h-screen rounded bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchUserEvents}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[96%] h-screen rounded bg-white p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Registered Events Calendar</h2>
            <div className="[&_.rbc-event]:cursor-pointer [&_.rbc-agenda-event-cell]:cursor-pointer [&_.rbc-agenda-row]:cursor-pointer">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    onSelectEvent={(event: RBCEvent) => setSelectedEvent(event.resource as Event)}
                    components={{
                        toolbar: (props: ToolbarProps) => {
                            const { onNavigate, label, onView, view } = props;
                            
                            // Define the view names we want to display
                            const viewNames = ['month', 'week', 'day', 'agenda'];
                            
                            return (
                                <div className="rbc-toolbar">
                                    <span className="rbc-btn-group">
                                        <button type="button" onClick={() => onNavigate('PREV')}>
                                            ←
                                        </button>
                                        <button type="button" onClick={() => onNavigate('TODAY')}>
                                            Today
                                        </button>
                                        <button type="button" onClick={() => onNavigate('NEXT')}>
                                            →
                                        </button>
                                    </span>
                                    <span className="rbc-toolbar-label">{label}</span>
                                    <span className="rbc-btn-group">
                                        {viewNames.map((viewName) => (
                                            <button
                                                key={viewName}
                                                type="button"
                                                className={view === viewName ? 'rbc-active' : ''}
                                                onClick={() => onView(viewName as View)}
                                            >
                                                {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                                            </button>
                                        ))}
                                    </span>
                                </div>
                            );
                        }
                    }}
                />
            </div>
            {/* Event details modal */}
            {selectedEvent && (
                <div 
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div 
                        className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 transform transition-all duration-200 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-3 text-gray-800">{selectedEvent.event_title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{selectedEvent.description}</p>
                        <div className="space-y-2 text-sm">
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 min-w-[60px]">Date:</span>
                                <span className="text-gray-600">{selectedEvent.start_date_time.toLocaleDateString()} - {selectedEvent.end_date_time.toLocaleDateString()}</span>
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 min-w-[60px]">Time:</span>
                                <span className="text-gray-600">{selectedEvent.start_date_time.toLocaleTimeString()} - {selectedEvent.end_date_time.toLocaleTimeString()}</span>
                            </p>
                            <p className="flex items-center">
                                <span className="font-semibold text-gray-700 min-w-[60px]">Location:</span>
                                <span className="text-gray-600">{selectedEvent.location}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

