import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_SECRET } from '@/conf';
import db from '@/lib/prisma.client';

export default function JwtStrategy() {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: JWT_SECRET
  };

  return new Strategy(options, async ({ sub, permissions }, next) => {
    const user = await db.User.findUnique({ where: { id: sub }, select: { id: true, email: true } });
    if (!user) return next(null, false);

    return next(null, { ...user, permissions });
  });
}
