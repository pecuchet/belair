import { jobs } from './settings';

const CronJob = require('cron').CronJob;

export class Cron {

	schedule() {
		jobs.forEach(job => {
			new CronJob({ cronTime: job.schedule, onTick: job.task }).start();
		});
	}

	start() {
		run();
	}
}

function run() {
	jobs.forEach(job => {
		job.task();
	});
}
