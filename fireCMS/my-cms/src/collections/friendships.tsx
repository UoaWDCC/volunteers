import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendshipsCollection = buildCollection({
	name: "Friendships",
	path: "friendships",
	singularName: "Friendships",
	id: "friendships",
	properties: {
		user_id: {
			dataType: 'string',
			description: 'ID of the user in the users collection',
			name: 'User ID',
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
				friend_id: {
					dataType: 'string',
					description: 'ID of the friend in the users collection',
					name: 'Friend ID',
				}
			}
		}
	],
});
