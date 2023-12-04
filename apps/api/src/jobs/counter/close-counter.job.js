import db from '@/lib/prisma.client';
import { sendEvent } from '@/sockets';

export async function closeCounterJob(job) {
  const { userId, counterId, createdAt } = job.data;
  const result = { action: '', meta: { userId, counterId } };
  const timeDiff = Date.now() - (new Date(createdAt).getTime() + 60000);
  if (timeDiff < 0) return result;

  const query = { where: { id: counterId } };
  const counter = await db.Counter.findUnique(query);
  if (!counter) return result;

  if (counter.value <= 0) {
    await db.Counter.delete(query);
    sendEvent(userId, 'counter-closed');
    return { ...result, action: 'removed' };
  }

  await db.Counter.update({ ...query, data: { status: 'completed' } });
  sendEvent(userId, 'counter-closed');
  return { ...result, action: 'updated' };
}
