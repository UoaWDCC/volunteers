import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendRequestsCollection = buildCollection({
    name: "FriendRequests",
    path: "friendrequests",
    singularName: "FriendRequests",
    id: "friendrequests",
    properties: {
        added_at: { 
            name: "Added At",
            dataType: "date", 
            autoValue: "on_create"
        },
        requester: {
            name: "Requester",
            dataType: "reference",
            path: "users"
        },
        reciever: {
            name: "Receiver",
            dataType: "reference",
            path: "users"
        },
    },
    subcollections: [],
});
