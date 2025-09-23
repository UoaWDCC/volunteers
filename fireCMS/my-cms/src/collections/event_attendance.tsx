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
    timestamp: {
      dataType: "date",
      name: "RSVP Time",
      description: "Time when the user RSVP'd",
      autoValue: "on_create",
      mode: "date_time",
    },
  },
  subcollections: [],
};