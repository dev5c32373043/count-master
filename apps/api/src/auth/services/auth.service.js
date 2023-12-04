import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '@/lib/prisma.client';
import { getRole } from '@/users/services/roles.service';
import { JWT_SECRET, SALT_ROUNDS } from '@/conf';

export async function logIn(email, password) {
  const user = await db.User.findFirst({ where: { email } });
  if (!user) {
    throw new Error('User not found', { cause: { status: 400 } });
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error('Wrong password', { cause: { status: 400 } });
  }
  // This may not work as expected if we need a broader set of permissions or update them in real-time
  const role = await getRole(user.roleId);
  user.permissions = role.permissions;

  return { user, token: signToken(user) };
}

export async function register(email, password, roleId) {
  const role = await getRole(roleId);
  if (!role) {
    throw new Error('User role not found', { cause: { status: 400 } });
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await db.User.create({ data: { email, password: hash, roleId } });
  user.permissions = role.permissions;

  return { user, token: signToken(user) };
}

export function signToken(user) {
  // TODO: add refresh token & decrease expiration time of access token
  const jwtPayload = { sub: user.id, permissions: user.permissions };
  const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '90d' });

  return token;
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
