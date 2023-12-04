import { upsertCounter } from '../services/counter.service';
import { logger, to } from '@/utils';

export async function decrement({ user }, res) {
  const [err, counter] = await to(upsertCounter(user.id, 'decrement'));
  if (err) {
    logger.error(err);
    res.state(500).json({ message: 'Internal server error' });
    return;
  }

  res.json(counter);
}
