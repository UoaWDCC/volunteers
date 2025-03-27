import { EntityCollection } from "@firecms/core";

export const GalleryCollection:EntityCollection = {
	id: 'gallery',
	name: 'Gallery',
	singularName: 'Gallery',
	path: 'gallery',
	description: 'The gallery seen on the home page',
	editable: true,
	icon: 'fiber_smart_record',
	group: 'Views',
	customId: false,
	properties: {
		image: {
			dataType: 'string',
			description: 'The image seen on the gallery card',
			storage: {
				storeUrl: true,
				storagePath: '/homepage/gallery',
				acceptedFiles: [
					'image/*',
				],
			},
			name: 'Image',
		},
		title: {
			description: 'The title on the gallery card',
			dataType: 'string',
			name: 'Title',
		},
	},
	subcollections: [],
}