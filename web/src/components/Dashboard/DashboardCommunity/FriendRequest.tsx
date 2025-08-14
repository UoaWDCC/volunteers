import React from 'react';

type FriendRequestProps = {
    username: string;
    avatarUrl?: string;
    onAccept: () => void;
    onDecline: () => void;
};

const FriendRequest: React.FC<FriendRequestProps> = ({
    username,
    avatarUrl,
    onAccept,
    onDecline,
}) => {
    return (
        <div className="flex flex-col items-center p-5 border border-gray-200 rounded-lg bg-white mb-2 shadow-sm w-full max-w-sm mx-auto">
            <div className="flex items-center w-full mb-3">
                <img
                    src={avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(username)}
                    alt={`${username} avatar`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                    <div className="font-bold text-xl text-black">{username}</div>
                    <div className="text-sm text-gray-500">sent you a friend request</div>
                </div>
            </div>
            <div className="flex w-full justify-center gap-4 mt-2">
                <button
                    onClick={onAccept}
                    className="bg-green-500 text-white font-semibold rounded px-5 py-2 cursor-pointer hover:bg-green-600 transition"
                >
                    Accept
                </button>
                <button
                    onClick={onDecline}
                    className="bg-red-500 text-white font-semibold rounded px-5 py-2 cursor-pointer hover:bg-red-600 transition"
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default FriendRequest;