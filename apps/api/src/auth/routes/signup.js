import { register } from '../services/auth.service';
import { validateEmail, validatePassword } from '@/validators';
import { logger, to } from '@/utils';

export default async function signUp(req, res) {
  const { email, password, roleId } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    res.status(400).json({ message: 'Please check your email and password' });
    return;
  }

  if (!Number.isInteger(roleId)) {
    res.status(400).json({ message: 'Invalid roleId format' });
    return;
  }

  const [err, result] = await to(register(email, password, roleId));
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
