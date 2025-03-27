import { EntityCollection } from "@firecms/core";

export const AchievementsCollection:EntityCollection = {
	id: 'achievements',
	name: 'Achievements',
	singularName: 'Achievement',
	path: 'achievements',
	description: 'The "Our Achievements" section of the homepage',
	editable: true,
	collectionGroup: false,
	icon: 'breakfast_dining',
	group: 'Views',
	customId: false,
	properties: {
		leftImage: {
			storage: {
				acceptedFiles: [
					'image/*',
				],
				storagePath: '/homepage/achievements',
				storeUrl: true,
			},
			description: 'The image on the left',
			dataType: 'string',
			name: 'Left Image',
		},
		leftText: {
			dataType: 'map',
			properties: {
				topText: {
					dataType: 'string',
					description: 'The top text of the left text box. The one above the statistic.',
					name: 'topText',
				},
				middleText: {
					description: 'The text in the middle of the text box on the left. Slightly larger than surrounding text, so best used for statistics.',
					dataType: 'string',
					name: 'MiddleText',
				},
				bottomText: {
					name: 'Bottom Text',
					dataType: 'string',
					description: 'The text at the bottom of the left text box. The one below the statistic.',
				},
			},
			name: 'Left Text',
			description: 'The text on the left',
		},
		middleImage: {
			description: 'The image in the middle',
			name: 'Middle Image',
			dataType: 'string',
			storage: {
				acceptedFiles: [
					'image/*',
				],
				storeUrl: true,
				storagePath: '/homepage/achievements',
			},
		},
		rightText: {
			dataType: 'map',
			description: 'The text box on the right',
			properties: {
				topText: {
					name: 'Top Text',
					dataType: 'string',
					description: 'The top text of the text box on the right. The text above the statistic.',
				},
				middleText: {
					dataType: 'string',
					description: 'The text in the middle of the right text box. The text is larger than the surrounding text, so its best used for statistics.',
					name: 'Middle Text',
				},
				bottomText: {
					description: 'The bottom text of the right text box. The text below the statistic.',
					dataType: 'string',
					name: 'Bottom Text',
				},
			},
			name: 'Right Text',
		},
		rightImage: {
			dataType: 'string',
			name: 'Right Image',
			storage: {
				storagePath: '/homepage/achievements',
				storeUrl: true,
			},
			description: 'The image on the right',
		},
	},
	subcollections: [],
}