import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendshipsCollection = buildCollection({
	name: "Friendships",
	path: "friendships",
	singularName: "Friendships",
	id: "friendships",
	properties: {
		friend_ids: {
			dataType: 'array',
			of: {
				dataType: 'string'
			},
			description: 'ID of the user in the users collection',
			name: 'Friend IDs',
		},
	},
});
