import { EntityCollection } from "@firecms/core";

export const NewslettersCollection: EntityCollection = {
	id: 'newsletters',
	name: 'Newsletters',
	singularName: 'Newsletter',
	path: 'newsletters',
	description: 'Newsletter titles for the system',
	editable: true,
	icon: 'mail',
	group: 'Content',
	properties: {
		title: {
			validation: {
				required: true,
				unique: true,
			},
			dataType: 'string',
			name: 'Newsletter Title',
			description: 'Unique title for the newsletter',
		},
	},
	subcollections: [],
}
