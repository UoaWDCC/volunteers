import { EntityCollection } from "@firecms/core";

export const UserEventRegistrationsCollection: EntityCollection = {
	id: 'userEventRegistrations',
	name: 'User Event Registrations',
	singularName: 'User Event Registration',
	path: 'userEventRegistrations',
	description: 'User registrations for events',
	editable: true,
	icon: 'event_available',
	group: 'Registrations',
	properties: {
		userId: {
			dataType: 'string',
			name: 'User ID',
			validation: {
				required: true,
				requiredMessage: 'User ID is required',
			},
			description: 'The ID of the user registering for the event',
		},
		eventId: {
			dataType: 'string',
			name: 'Event ID',
			validation: {
				required: true,
				requiredMessage: 'Event ID is required',
			},
			description: 'The ID of the event being registered for',
		},
		userEmail: {
			dataType: 'string',
			name: 'User Email',
			validation: {
				required: true,
				requiredMessage: 'User email is required',
			},
			description: 'The email of the user for easy reference',
		},
		eventTitle: {
			dataType: 'string',
			name: 'Event Title',
			validation: {
				required: true,
				requiredMessage: 'Event title is required',
			},
			description: 'The title of the event for easy reference',
		},
		registrationDate: {
			dataType: 'date',
			name: 'Registration Date',
			mode: 'date_time',
			validation: {
				required: true,
			},
			description: 'When the user registered for the event',
		},
		status: {
			dataType: 'string',
			name: 'Status',
			enumValues: [
				{
					id: 'registered',
					label: 'Registered',
				},
				{
					id: 'cancelled',
					label: 'Cancelled',
				},
				{
					id: 'attended',
					label: 'Attended',
				},
				{
					id: 'no_show',
					label: 'No Show',
				},
			],
			validation: {
				required: true,
			},
			defaultValue: 'registered',
			description: 'Current status of the registration',
		},
		notes: {
			dataType: 'string',
			name: 'Notes',
			multiline: true,
			description: 'Additional notes about the registration',
		},
	},
	subcollections: [],
}; 