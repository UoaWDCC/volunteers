import { useState, useEffect } from 'react';
import { trackExternalRegistrationReturn, setExternalRegistrationFlags, clearExternalRegistrationFlags } from '../utils/externalRegistrationTracker';

export const useExternalRegistration = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pendingEvent, setPendingEvent] = useState<{id: string, title: string} | null>(null);
    const [externallyRegisteredEvents, setExternallyRegisteredEvents] = useState<Set<string>>(new Set());

    useEffect(() => {
        const savedRegistrations = localStorage.getItem('external-registrations');
        if (savedRegistrations) {
            setExternallyRegisteredEvents(new Set(JSON.parse(savedRegistrations)));
        }
        const checkReturn = () => {
            const returned = trackExternalRegistrationReturn();
            const eventId = localStorage.getItem('external-event-id');
            const eventTitle = localStorage.getItem('external-event-title');
            
            if (returned && eventId && eventTitle) {
                showPopupImmediately(eventId, eventTitle);
            }
        };

        checkReturn();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkReturn();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        const handleFocus = () => {
            checkReturn();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    const showPopupImmediately = (eventId: string, eventTitle: string) => {
        setShowConfirmation(true);
        setPendingEvent({id: eventId, title: eventTitle});
        console.log('Showing confirmation popup immediately for:', eventTitle);
        
        // Clear the flags immediately so it doesn't trigger again
        localStorage.removeItem('external-reg-returned');
    };

    const startExternalRegistration = (eventId: string, eventTitle: string, url: string) => {
        setExternalRegistrationFlags(eventId, eventTitle);
        window.open(url, '_blank', 'noopener,noreferrer');
        
        // Set a timeout to check if user returned quickly (for better UX)
        setTimeout(() => {
            const returned = trackExternalRegistrationReturn();
            const storedEventId = localStorage.getItem('external-event-id');
            const storedEventTitle = localStorage.getItem('external-event-title');
            
            if (returned && storedEventId === eventId && storedEventTitle === eventTitle) {
                showPopupImmediately(eventId, eventTitle);
            }
        }, 1000); // Check after 1 second
    };

    const completeRegistration = () => {
        if (pendingEvent) {
            const newRegisteredEvents = new Set(externallyRegisteredEvents);
            newRegisteredEvents.add(pendingEvent.id);
            setExternallyRegisteredEvents(newRegisteredEvents);
            
            localStorage.setItem('external-registrations', JSON.stringify(Array.from(newRegisteredEvents)));
        }
        setShowConfirmation(false);
        setPendingEvent(null);
        clearExternalRegistrationFlags();
    };

    const cancelRegistration = () => {
        setShowConfirmation(false);
    };

    const unregisterExternalEvent = (eventId: string) => {
        const newRegisteredEvents = new Set(externallyRegisteredEvents);
        newRegisteredEvents.delete(eventId);
        setExternallyRegisteredEvents(newRegisteredEvents);
        
        localStorage.setItem('external-registrations', JSON.stringify(Array.from(newRegisteredEvents)));
    };
    const isExternallyRegistered = (eventId: string): boolean => {
        return externallyRegisteredEvents.has(eventId);
    };

    return {
        showConfirmation,
        pendingEvent,
        startExternalRegistration,
        completeRegistration,
        cancelRegistration,
        unregisterExternalEvent,
        isExternallyRegistered
    };
};