import { Queue, Worker } from 'bullmq';
import { COUNTER_QUEUE_NAME, REDIS_HOST, REDIS_PORT } from '@/conf';
import { logger } from '@/utils';

import counterJobs from './counter';

const connection = {
  host: REDIS_HOST,
  port: REDIS_PORT
};

const queueOptions = {
  connection,
  defaultJobOptions: {
    attempts: 5,
    removeOnFail: false
  }
};

const worker = new Worker(
  COUNTER_QUEUE_NAME,
  async job => {
    const jobToExecute = counterJobs[job.name];
    if (typeof jobToExecute !== 'function') {
      throw new Error(`${job.name} not found`);
    }

    return jobToExecute(job);
  },
  { connection }
);

worker.on('completed', job => {
  logger.info(job.returnvalue, `${job.id} completed!`);
});

worker.on('failed', (job, err) => {
  logger.error(`${job.id} failed with ${err.message}`);
});

export const CounterQueue = new Queue(COUNTER_QUEUE_NAME, queueOptions);
