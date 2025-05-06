import { EntityCollection } from "@firecms/core";

export const HighlightsCollection:EntityCollection = {
	id: 'highlights',
	name: 'Highlights',
	singularName: 'Highlight',
	path: 'highlights',
	description: 'The event highlights on the home page',
	editable: true,
	icon: 'bolt',
	group: 'Views',
	properties: {
		title: {
			description: 'Title of the highlight',
			dataType: 'string',
			name: 'Title',
		},
		description: {
			name: 'Description',
			multiline: true,
			dataType: 'string',
			description: 'A short description of the event',
		},
		topLeftImage: {
			dataType: 'string',
			storage: {
				storagePath: '/homepage/highlights',
				storeUrl: true,
				acceptedFiles: [
					'image/*',
				],
			},
			description: 'The image on the top left',
			name: 'Top Left Image',
		},
		bottomLeftImage: {
			dataType: 'string',
			description: 'The image on the bottom left',
			name: 'Bottom Left Image',
			storage: {
				acceptedFiles: [
					'image/*',
				],
				storeUrl: true,
				storagePath: '/homepage/highlights',
			},
		},
		topRightImage: {
			storage: {
				storeUrl: true,
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/homepage/highlights',
			},
			description: 'The image on the top right',
			dataType: 'string',
			name: 'Top Right Image',
		},
		rightImage: {
			storage: {
				storagePath: '/homepage/highlights',
				storeUrl: true,
			},
			dataType: 'string',
			description: 'The image on the right',
			name: 'Right Image',
		},
		bottomRightImage: {
			name: 'Bottom Right Image',
			dataType: 'string',
			description: 'The image in the bottom right',
			storage: {
				storagePath: '/homepage/highlights',
				storeUrl: true,
				acceptedFiles: [
					'image/*',
				],
			},
		},
	},
	subcollections: [],
}