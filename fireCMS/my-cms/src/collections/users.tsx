import { EntityCollection } from "@firecms/core";

export const UsersCollection:EntityCollection = {
	id: 'users',
	name: 'Users',
	singularName: 'User',
	path: 'users',
	description: 'Registered users in the app',
	editable: true,
	icon: 'person',
	properties: {
		profile_picture: {
			dataType: 'string',
			storage: {
				storagePath: '/user',
				fileName: '{entityId}_image',
				storeUrl: true,
			},
			name: 'Profile Picture',
			description: "The user's profile picture",
		},
		firstName: {
			validation: {
				required: true,
				trim: true,
				requiredMessage: 'Please enter a first name',
			},
			name: 'First Name',
			dataType: 'string',
		},
		lastName: {
			dataType: 'string',
			validation: {
				required: true,
				trim: true,
				requiredMessage: 'Please enter a last name',
			},
			name: 'Last Name',
		},
		email: {
			validation: {
				trim: true,
				required: true,
				requiredMessage: 'Please enter an email',
			},
			name: 'Email',
			dataType: 'string',
			email: true,
		},
		mobile: {
			name: 'Mobile',
			validation: {
				requiredMessage: 'Please enter a mobile number',
				trim: true,
				required: true,
			},
			dataType: 'string',
		},
		upi: {
			dataType: 'string',
			name: 'UPI',
			validation: {
				unique: true,
				requiredMessage: 'Please enter a UPI',
				required: true,
				trim: true,
			},
		},
		birthdate: {
			dataType: 'string',
			name: 'Date of Birth',
			validation: {
				trim: true,
			},
		},
		gender: {
			enumValues: [
				{
					id: 'male',
					label: 'Male',
				},
				{
					id: 'female',
					label: 'Female',
				},
				{
					label: 'Non-binary',
					id: 'Non-binary',
				},
				{
					id: 'prefernottosay',
					label: 'Prefer not to say',
				},
				{
					id: 'Other',
					label: 'Other',
				},
			],
			name: 'Gender',
			dataType: 'string',
		},
		yearLevel: {
			dataType: 'string',
			name: 'Year Level',
			enumValues: [
				{
					id: 'first',
					label: '1st Year',
				},
				{
					label: '2nd Year',
					id: 'second',
				},
				{
					id: 'third',
					label: '3rd Year',
				},
				{
					label: '4th Year',
					id: 'fourth',
				},
				{
					label: 'Post-graduate',
					id: 'postgraduate',
				},
				{
					label: 'Other',
					id: 'otheryear',
				},
			],
			validation: {
				requiredMessage: 'Please select a year level',
				required: true,
			},
		},
		dietaryRequirements: {
			name: 'Dietary Requirements',
			dataType: 'array',
			of: {
				enumValues: [
					{
						label: 'Vegan',
						id: 'vegan',
					},
					{
						id: 'vegetarian',
						label: 'Vegetarian',
					},
					{
						label: 'Dairy-Free',
						id: 'dairyfree',
					},
					{
						label: 'Gluten-Free',
						id: 'glutenfree',
					},
					{
						id: 'halal',
						label: 'Halal',
					},
					{
						label: 'Other',
						id: 'otherrequirements',
					},
				],
				dataType: 'string',
			},
		},
		driversLicense: {
			dataType: 'string',
			enumValues: [
				{
					id: 'none',
					label: 'None',
				},
				{
					id: 'learners',
					label: 'Learners',
				},
				{
					label: 'Restricted',
					id: 'restricted',
				},
				{
					label: 'Full',
					id: 'full',
				},
			],
			name: "Driver's License Type",
		},
		hours: {
			description: 'Amount of volunteering hours done',
			defaultValue: 0,
			validation: {
				min: 0,
			},
			name: 'Hours',
			dataType: 'number',
		},
		otherRequirements: {
			dataType: 'string',
			validation: {
				trim: true,
			},
			name: 'Accessibility Requirements',
		},
		emergencyContactFirstName: {
			validation: {
				trim: true,
				requiredMessage: 'Please enter a first name for the emergency contact',
				required: true,
			},
			name: 'Emergency Contact First Name',
			dataType: 'string',
		},
		emergencyContactLastName: {
			dataType: 'string',
			validation: {
				required: true,
				requiredMessage: 'Please enter a last name for the emergency contact',
			},
			name: 'Emergency Contact Last Name',
		},
		emergencyContactMobile: {
			dataType: 'string',
			validation: {
				required: true,
				trim: true,
				requiredMessage: 'Please enter a mobile number for the emergency contact',
			},
			name: 'Emergency Contact Mobile',
		},
		emergencyContactRelationship: {
			validation: {
				required: true,
				requiredMessage: 'Please enter a relationship for the emergency contact',
				trim: true,
			},
			dataType: 'string',
			name: 'Emergency Contact Relationship',
		},
		role : {
			enumValues: [
				{
					id: 'admin',
					label: 'Admin'
				},
				{
					id: 'member',
					label: 'Member'
				}
			],
			name: 'Role',
			dataType: 'string',
		}
	},
	subcollections: [],
}