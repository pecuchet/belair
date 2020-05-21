import importData from './tasks/import';

export const jobs = [
	{
		name: 'Test',
		schedule: '* * * * * *',
		task: importData,
		maxAgeSeconds: 3600 * 25
	}
];
