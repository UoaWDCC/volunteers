export const trackExternalRegistrationReturn = (): boolean => {
    try {
        const wasRedirected = localStorage.getItem('external-reg-redirect');
        const redirectTime = localStorage.getItem('external-reg-time');
        const eventId = localStorage.getItem('external-event-id');
        const eventTitle = localStorage.getItem('external-event-title');
        
        if (wasRedirected === 'true' && eventId && eventTitle && redirectTime) {
            const redirectTimestamp = parseInt(redirectTime);
            const currentTime = Date.now();
            const timeDiff = currentTime - redirectTimestamp;
            
            if (timeDiff < 5 * 60 * 1000) {
                localStorage.setItem('external-reg-returned', 'true');
                console.log('User returned within 5 minutes, setting returned flag');
                return true;
            } else {
                console.log('User returned after 5 minutes, clearing flags');
                clearExpiredFlags();
            }
            
            localStorage.removeItem('external-reg-redirect');
        }
        return false;
    } catch (error) {
        console.error('Error in registration tracker:', error);
        return false;
    }
};

export const setExternalRegistrationFlags = (eventId: string, eventTitle: string): void => {
    localStorage.setItem('external-reg-redirect', 'true');
    localStorage.setItem('external-event-id', eventId);
    localStorage.setItem('external-event-title', eventTitle);
    localStorage.setItem('external-reg-time', Date.now().toString());
    console.log('Set external registration flags for:', eventTitle);
};

export const clearExternalRegistrationFlags = (): void => {
    localStorage.removeItem('external-reg-redirect');
    localStorage.removeItem('external-event-id');
    localStorage.removeItem('external-event-title');
    localStorage.removeItem('external-reg-time');
    localStorage.removeItem('external-reg-returned');
    console.log('Cleared all external registration flags');
};
const clearExpiredFlags = (): void => {
    localStorage.removeItem('external-event-id');
    localStorage.removeItem('external-event-title');
    localStorage.removeItem('external-reg-time');
    localStorage.removeItem('external-reg-redirect');
};