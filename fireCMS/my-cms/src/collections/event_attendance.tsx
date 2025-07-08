import { EntityCollection } from "@firecms/core";

export const EventAttendanceCollection: EntityCollection = {
  id: "event_attendance",
  name: "Event Attendance",
  singularName: "Event Attendance Record",
  path: "event_attendance",
  description: "Tracks which users are attending which events",
  editable: true,
  icon: "event_available",
  group: "Events",
  properties: {
    eventId: {
      dataType: "reference",
      name: "Event",
      path: "events",
      previewProperties: ["event_title"],
      validation: {
        required: true,
      },
    },
    uid: {
      dataType: "reference",
      name: "User",
      path: "users",
      previewProperties: ["firstName", "lastName", "email"],
      validation: {
        required: true,
      },
    },
  },
  subcollections: [],
};