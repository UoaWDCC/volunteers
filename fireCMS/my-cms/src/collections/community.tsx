import { EntityCollection } from "@firecms/core";

export const communityCollection:EntityCollection = {
	id: 'community',
	name: 'Community ',
	singularName: 'Community ',
	path: 'community',
	description: 'The "Our Community" section of the home page',
	editable: true,
	icon: 'flag',
	group: 'Views',
	customId: false,
	properties: {
		volunteerStatistic: {
			dataType: 'string',
			name: 'Volunteer Statistic',
			description: 'The statistic about the number of volunteers in the club',
		},
		topLeftImage: {
			description: 'The image in the top left',
			dataType: 'string',
			name: 'Top Left Image',
			storage: {
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/homepage/community',
				storeUrl: true,
			},
		},
		bottomLeftImage: {
			storage: {
				storeUrl: true,
				storagePath: '/homepage/community',
				acceptedFiles: [
					'image/*',
				],
			},
			description: 'The image in the bottom left',
			name: 'Bottom Left Image',
			dataType: 'string',
		},
		topRightImage: {
			description: 'The image in the top right',
			storage: {
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/homepage/community',
				storeUrl: true,
			},
			name: 'Top Right Image',
			dataType: 'string',
		},
		bottomRightImage: {
			dataType: 'string',
			storage: {
				storeUrl: true,
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/homepage/community',
			},
			description: 'The image in the bottom right',
			name: 'Bottom Right Image',
		},
	},
	subcollections: [],
}