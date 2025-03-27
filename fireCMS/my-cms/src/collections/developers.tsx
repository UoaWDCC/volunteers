import { EntityCollection } from "@firecms/core";

export const DevelopersCollection:EntityCollection = {
	id: 'developers-first-gen',
	name: 'Developers',
	path: 'developers-first-gen',
	editable: true,
	icon: 'panorama_photosphere',
	group: '',
	properties: {
		profile_pic: {
			dataType: 'string',
			storage: {
				storagePath: '/developers',
				storeUrl: true,
			},
			name: 'Profile Pic',
		},
		first_name: {
			dataType: 'string',
			validation: {
				required: true,
			},
			name: 'First Name',
		},
		last_name: {
			dataType: 'string',
			name: 'Last Name',
			validation: {
				required: true,
			},
		},
		role: {
			name: 'Role',
			dataType: 'string',
			validation: {
				required: true,
			},
		},
		year_level: {
			enumValues: [
				{
					label: '1st Year',
					id: '1st Year',
				},
				{
					id: '2nd Year',
					label: '2nd Year',
				},
				{
					label: '3rd Year',
					id: '3rd Year',
				},
				{
					id: '4th Year',
					label: '4th Year',
				},
				{
					id: '5th Year',
					label: '5th Year',
				},
				{
					label: '6th Year',
					id: '6th Year',
				},
			],
			defaultValue: '1st Year',
			name: 'Year Level',
			dataType: 'string',
		},
		major: {
			validation: {
				required: true,
			},
			name: 'Major',
			dataType: 'string',
		},
		linkedin: {
			dataType: 'string',
			name: 'Linkedin',
			url: true,
		},
	},
	subcollections: [],
}