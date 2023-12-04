const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const roles = [
  {
    id: 1,
    name: 'Basic User',
    permissions: ['counter:read', 'counter:incr', 'counter:decr']
  },
  {
    id: 2,
    name: 'PRO User',
    permissions: ['counter:read', 'counter:incr', 'counter:decr', 'counter:history']
  }
];

async function main() {
  for (const role of roles) {
    await db.UserRole.upsert({
      where: { id: role.id },
      create: { ...role },
      update: {}
    });
  }

  console.log('Roles successfully upserted');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async err => {
    console.error(err);
    await db.$disconnect();
    process.exit(1);
  });
