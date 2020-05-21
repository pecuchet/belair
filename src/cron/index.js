import { Cron } from './Cron';

const cron = new Cron();

cron.schedule();

// Run jobs when the server starts
cron.start();
