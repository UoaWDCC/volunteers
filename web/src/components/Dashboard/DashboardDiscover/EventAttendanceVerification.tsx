import { useState } from 'react';

type Event = {
    coordinates: {longitude: string, latitude: string};
}

interface EventAttendanceVerificationProps {
    event: Event;
}

export default function EventAttendanceVerification({ event }: EventAttendanceVerificationProps) {
    const [isLocationVerificationPopupVisible, setIsLocationVerificationPopupVisible] = useState(false);
    const [isDistanceResultPopupVisible, setIsDistanceResultPopupVisible] = useState(false);
    const [distanceResultMessage, setDistanceResultMessage] = useState('');

    // Calculate distance between event and current user location
    function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in kilometers
    }

    const handleAttendanceVerificationClick = () => {
        setIsLocationVerificationPopupVisible(true);
    };

    const handleVerifyLocation = () => {
        setIsLocationVerificationPopupVisible(false);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;
                    const eventLat = parseFloat(event.coordinates.latitude);
                    const eventLon = parseFloat(event.coordinates.longitude);
                    
                    const distance = calculateDistance(userLat, userLon, eventLon, eventLat);
                    let message;
                    if (distance < 1) {
                        message = `You're ${distance.toFixed(2)} km away from the event. Thanks for joining us!`;
                    } else {
                        message = `You're ${distance.toFixed(2)} km away from the event. You must be within 1 km to verify your attendance.`;
                    }
                    setDistanceResultMessage(message);
                    setIsDistanceResultPopupVisible(true);
                },
                (error) => {
                    alert("Unable to get your location. Please try again.");
                }
            );
        } else {
            alert("This browser does not support geolocation.");
        }
    };

    const handleCancelLocationVerification = () => {
        setIsLocationVerificationPopupVisible(false);
    };

    return (
        <>
            <button 
                className="h-10 text-body-heading rounded-full" 
                onClick={handleAttendanceVerificationClick}
            >
                Verify Attendance
            </button>

            {/* Location verification popup */}
            {isLocationVerificationPopupVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3 text-center">
                        <h2 className="text-lg font-semibold mb-4">Would you like to verify your attendance through location?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={handleVerifyLocation}
                            >
                                Verify
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={handleCancelLocationVerification}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Distance result popup */}
            {isDistanceResultPopupVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3 text-center">
                        <h2 className="text-lg font-semibold mb-4">{distanceResultMessage}</h2>
                        <div className="flex justify-center">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => setIsDistanceResultPopupVisible(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
