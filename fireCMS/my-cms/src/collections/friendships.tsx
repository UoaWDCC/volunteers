import { buildCollection } from "@firecms/core";

// This is a demo collection with many of the available properties
export const FriendshipsCollection = buildCollection({
    name: "Friendships",
    path: "friendships",
    singularName: "Friendship",
    id: "friendships",
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
        status: {
            name: "Friendship Status",
            dataType: "string",
            enumValues: [
                {
                    id: 'pending',
                    label: 'Pending',
                },
                {
                    id: 'accepted',
                    label: 'Accepted',
                }
            ]
        }
    }
});
