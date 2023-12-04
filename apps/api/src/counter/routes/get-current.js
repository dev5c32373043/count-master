import { getCurrentCounter } from '../services/counter.service';
import { to, logger } from '@/utils';

export async function getCurrent({ user }, res) {
  const [err, counter] = await to(getCurrentCounter(user.id));
  if (err) {
    logger.error(err);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  res.json(counter);
}
