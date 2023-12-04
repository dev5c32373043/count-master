import { logIn } from '../services/auth.service';
import { validateEmail, validatePassword } from '@/validators';
import { logger, to } from '@/utils';

export default async function login(req, res) {
  const { email, password } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    res.status(400).json({ message: 'Please check your email and password' });
    return;
  }

  const [err, result] = await to(logIn(email, password));
  if (err) {
    if (err?.cause?.status === 400) {
      res.status(400).json({ message: 'Invalid email or password' });
    } else {
      logger.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }

    return;
  }

  res.json(result);
}
