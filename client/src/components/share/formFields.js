export default [
	{
		label: 'Comma-Separated Recipient Email Addresses',
		name: 'recipients',
		type: 'text',
		starting: 'Lorem ipsum',
		component: 'ShareListForm',
		placeholder: 'Comma-Separated Addresses'
	},
	{
		label: 'Subject Line',
		name: 'subject',
		type: 'text',
		component: 'ShareListForm',
		starting: 'Lorem ipsum',
		placeholder: 'Email Subject Line'
	},
	{
		label: 'Email Body',
		name: 'body',
		type: 'textarea',
		component: 'ShareListTextArea',
		starting: 'Lorem ipsum',
		placeholder: 'Email body'
	}
];
