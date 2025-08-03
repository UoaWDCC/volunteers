import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendsCollection = buildCollection({
    name: "Friends",
    path: "friends",
    singularName: "Friends",
    id: "friends",
    properties: {
        user_ref: { 
            name: "User",
            dataType: "reference", 
            path: "users"
        },
    },
    subcollections: [
		{
			name: "Friendships",
			path: "friendships",
			singularName: "friendship",
			id: "friendships",
			properties: {
				added_at: { 
					name: "Added At",
					dataType: "date", 
					autoValue: "on_create"
				},
				friend_ref: {
					dataType: "reference",
					name: "Participant",
					path: "users"
				}
			}
		}
	],
});
