import React from 'react';

type FriendRequestProps = {
    username: string;
    avatarUrl?: string;
    mutualFriends?: string;
    onAccept: () => void;
    onDecline: () => void;
};

const FriendRequest: React.FC<FriendRequestProps> = ({
    username,
    avatarUrl,
    mutualFriends,
    onAccept,
    onDecline,
}) => {
    return (
        <div className="py-6 px-6 flex items-center justify-between border-b border-gray-100 last:border-b-0">
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-5">
                    <img
                        src={avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(username)}
                        alt={`${username} avatar`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div className="font-bold text-lg text-black">{username}</div>
                    {mutualFriends && (
                        <div className="text-gray-500 flex items-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-500">{mutualFriends}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-5">
                <button
                    onClick={onDecline}
                    className="px-4 py-2 bg-white text-black text-sm font-normal rounded-md hover:bg-red-500 hover:text-white transition"
                >
                    Ignore
                </button>
                <button
                    onClick={onAccept}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-normal rounded-full hover:bg-green-600 transition"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default FriendRequest;