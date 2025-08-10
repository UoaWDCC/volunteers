import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendRequestsCollection = buildCollection({
    name: "FriendRequests",
    path: "friendrequests",
    singularName: "FriendRequest",
    id: "friendrequests",
    properties: {
        added_at: { 
            name: "Added At",
            validation: {
				required: true,
			},
			mode: 'date_time',
            dataType: "date", 
            autoValue: "on_create"
        },
        requester_id: {
            name: 'Requester',
            dataType: 'string',
            description: 'User id of the requesting user',
        },
        reciever_id: {
            name: 'Reciever',
            dataType: 'string',
            description: 'User id of the recieving user',
        }
    },
    subcollections: [],
});
