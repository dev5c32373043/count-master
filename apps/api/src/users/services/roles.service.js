import db from '@/lib/prisma.client';

export async function getRole(roleId) {
  const role = await db.UserRole.findUnique({ where: { id: roleId } });
  return role;
}
