import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendshipsCollection = buildCollection({
    name: "Friendships",
    path: "friendships",
    singularName: "Friendships",
    id: "friendships",
    properties: {
        user_ref: { 
            name: "User",
            dataType: "reference", 
            path: "users"
        },
    },
    subcollections: [
		{
			name: "Friends",
			path: "friends",
			singularName: "Friend",
			id: "friends",
			properties: {
				added_at: { 
					name: "Added At",
					dataType: "date", 
					autoValue: "on_create"
				},
				friend_ref: {
					dataType: "reference",
					name: "friend",
					path: "users"
				}
			}
		}
	],
});
