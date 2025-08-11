import { EntityCollection } from "@firecms/core";

export const EventsCollection:EntityCollection= {
	id: 'events',
	name: 'Events',
	singularName: 'Event',
	path: 'events',
	description: 'Suggested Aspect Ratio: ',
	editable: true,
	icon: 'egg_alt',
	group: '',
	properties: {
		event_title: {
			validation: {
				required: true,
			},
			dataType: 'string',
			name: 'Event Title',
		},
		image: {
			dataType: 'string',
			storage: {
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/events',
				storeUrl: true,
			},
			name: 'Image',
			description: 'The image for the event',
		},
		description: {
			multiline: true,
			name: 'Description',
			dataType: 'string',
		},
		tasks: {
			description: 'Key tasks and responsibilities of the event',
			dataType: 'string',
			multiline: true,
			name: 'Key Tasks and Responsibilities',
		},
		notes: {
			description: 'Important notes about the event',
			multiline: true,
			dataType: 'string',
			name: 'Important Notes',
		},
		contact: {
			dataType: 'string',
			description: 'Contact details of the event',
			multiline: true,
			name: 'Contact Details',
		},
		tag: {
			columnWidth: 165,
			of: {
				enumValues: [
					{
						id: 'Flagship Event',
						label: 'Flagship Event',
					},
					{
						label: 'Volunteering',
						id: 'Volunteering',
					},
					{
						id: 'Event',
						label: 'Event',
					},
					{
						id: 'Social',
						label: 'Social',
					},
					{
						id: 'Other',
						label: 'Other',
					},
					{
						id: 'External Event',
						label: 'External Event',
					}
				],
				dataType: 'string',
			},
			dataType: 'array',
			validation: {
				required: true,
			},
			name: 'Tag',
		},
		start_date_time: {
			name: 'Start Date / Time',
			validation: {
				required: true,
			},
			mode: 'date_time',
			dataType: 'date',
		},
		end_date_time: {
			name: 'End Date / Time',
			dataType: 'date',
			mode: 'date_time',
			validation: {
				required: true,
			},
		},
		location: {
			validation: {
				required: true,
			},
			name: 'Location',
			dataType: 'string',
			multiline: true,
		},
		host: {
			description: 'The host of the event',
			name: 'Event Host',
			dataType: 'string',
		},
		coordinates: {
			name: 'map coordinates',
			dataType: 'map',
			properties: {
				longitude: {
					name: 'longitude',
					dataType: 'string',
					description: 'The longitude (first value from the Google Map right click copy)',
				},
				latitude: {
					name: 'latitude',
					description: 'The latitude (second value from the Google Map right click copy)',
					dataType: 'string',
				},
			},
			description: 'The coordinates of the location on maps. Get this by right clicking in Google Maps and selecting the first option',
		},
		is_external: {
            dataType: 'boolean',
            name: 'External Event',
            description: 'Check if registration happens on an external site',
            defaultValue: false,
            columnWidth: 120,
			config: {
				previewAsTag: true,
				tagValues: {
					true: {
						label: "External",
						color: "#FF5722"
					},
					false: {
						label: "Internal",
						color: "#4CAF50"
					}
				}
			}
        },
        external_registration_url: {
            dataType: 'string',
            name: 'Registration URL',
            description: 'The external registration link (required for external events)',
            validation: {
                url: true,
                required: (values: { is_external?: boolean }) => values.is_external ? true : false
            },
            disabled: ({ values }: { values: { is_external?: boolean } }) => !values.is_external,
            clearOnDisabled: true,
            config: {
                url: true // Makes the URL clickable in the table
            }
        }
	},
	subcollections: [],
}