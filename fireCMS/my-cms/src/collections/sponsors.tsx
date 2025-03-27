import { EntityCollection } from "@firecms/core";

export const SponsorsCollection:EntityCollection = {
	id: 'sponsors',
	name: 'Sponsors',
	singularName: 'Sponsor',
	path: 'sponsors',
	description: 'The sponsors in the sponsors section of the home page',
	editable: true,
	icon: 'local_library',
	group: 'Views',
	customId: false,
	properties: {
		logo: {
			name: 'Logo',
			storage: {
				storeUrl: true,
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/homepage/sponsors',
			},
			description: "The sponsor's logo",
			dataType: 'string',
		},
		name: {
			dataType: 'string',
			name: 'Name',
			description: 'The name of the sponsor',
		},
		discount: {
			name: 'Discount',
			dataType: 'string',
			description: 'The discount that club members get.',
		},
		website: {
			dataType: 'string',
			name: 'Website',
			description: "The URL of the sponsor's website (or social media)",
		},
	},
	subcollections: [],
}