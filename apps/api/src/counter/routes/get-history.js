import { getCounterHistory } from '../services/counter.service';
import { logger, to } from '@/utils';

export async function getHistory({ user }, res) {
  const [err, counters] = await to(getCounterHistory(user.id));
  if (err) {
    logger.error(err);
    res.state(500).json({ message: 'Internal server error' });
    return;
  }

  res.json(counters);
}
