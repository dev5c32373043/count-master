import db from '@/lib/prisma.client';
import { CounterQueue } from '@/jobs';

export async function getCurrentCounter(userId) {
  const counter = await db.Counter.findFirst({ where: { status: 'pending', userId } });
  return counter ?? { value: 0 };
}

export async function getCounterHistory(userId) {
  const counters = await db.Counter.findMany({
    where: { status: 'completed', userId },
    orderBy: { createdAt: 'desc' }
  });

  return counters;
}

export async function upsertCounter(userId, op) {
  if (!['increment', 'decrement'].includes(op)) {
    throw new Error(`Unsupported operation: ${op}`);
  }

  const query = { status: 'pending', userId };

  let isNewCounter = false;
  let storedCounter = await db.Counter.findFirst({ where: query, select: { id: true } });
  if (!storedCounter) {
    isNewCounter = true;
    storedCounter = await db.Counter.create({ data: query });
  }

  const updatedCounter = await db.Counter.update({
    where: { id: storedCounter.id },
    data: { value: { [op]: 1 } }
  });

  // Adding delayed job to close the counter after 1 minute
  if (isNewCounter) {
    const { id, createdAt } = storedCounter;
    const jobData = { userId, counterId: id, createdAt };
    const timeDiff = Date.now() - new Date(createdAt).getTime();
    const delay = 60000 - (timeDiff % 60000);
    CounterQueue.add('close-counter', jobData, { delay });
  }

  return updatedCounter;
}
