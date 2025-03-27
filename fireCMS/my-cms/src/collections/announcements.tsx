import { EntityCollection } from "@firecms/core";

export const AnnouncementsCollection:EntityCollection = {
	id: 'Announcements',
	name: 'Announcements',
	path: 'Announcements',
	editable: true,
	icon: 'healing',
	group: 'Views',
	properties: {
		title: {
			dataType: 'string',
			validation: {
				required: true,
			},
			name: 'Title',
		},
		message: {
			validation: {
				required: true,
			},
			name: 'Message',
			dataType: 'string',
		},
		tags: {
			of: {
				dataType: 'string',
				name: 'Tags',
				enumValues: [
					{
						id: 'All Volunteers',
						label: 'All Volunteers',
					},
					{
						id: 'First Year',
						label: 'First Year',
					},
					{
						id: 'Social Event',
						label: 'Social Event',
					},
					{
						label: 'Volunteering Opportunity',
						id: 'Volunteering Opportunity',
					},
				],
			},
			dataType: 'array',
			name: 'Tags',
		},
		start_date_time: {
			mode: 'date_time',
			name: 'StartDateTime',
			dataType: 'date',
			validation: {
				required: true,
			},
		},
		end_date_time: {
			validation: {
				required: true,
			},
			dataType: 'date',
			mode: 'date_time',
			name: 'EndDateTime',
		},
	},
	subcollections: [],
}
