import { useState, useEffect } from 'react';
export const useExternalRegistration = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [pendingEvent, setPendingEvent] = useState<{id: string, title: string} | null>(null);
    const [externallyRegisteredEvents, setExternallyRegisteredEvents] = useState<Set<string>>(new Set());

    useEffect(() => {
        const savedRegistrations = localStorage.getItem('external-registrations');
        if (savedRegistrations) {
            setExternallyRegisteredEvents(new Set(JSON.parse(savedRegistrations)));
        }
        const pendingEventId = localStorage.getItem('pending-event-id');
        const pendingEventTitle = localStorage.getItem('pending-event-title');
        
        if (pendingEventId && pendingEventTitle) {
            setShowConfirmation(true);
            setPendingEvent({id: pendingEventId, title: pendingEventTitle});
        }
    }, []);

    const startExternalRegistration = (eventId: string, eventTitle: string, url: string) => {
        // Show popup immediately
        setShowConfirmation(true);
        setPendingEvent({id: eventId, title: eventTitle});
        
        // Store in localStorage so it persists across page refreshes
        localStorage.setItem('pending-event-id', eventId);
        localStorage.setItem('pending-event-title', eventTitle);
        
        // Open external site
        window.open(url, '_blank', 'noopener,noreferrer');
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
        localStorage.removeItem('pending-event-id');
        localStorage.removeItem('pending-event-title');
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