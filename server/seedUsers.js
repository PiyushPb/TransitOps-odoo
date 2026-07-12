const { PrismaClient } = require('./src/generated/prisma/client');
const bcrypt = require('bcrypt'); // or bcryptjs if that's what is installed

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);
  
  const users = [
    { role_id: 1, first_name: 'Admin', last_name: 'User', email: 'admin@transit.com', password_hash: hash, is_active: true },
    { role_id: 2, first_name: 'Fleet', last_name: 'Manager', email: 'manager@transit.com', password_hash: hash, is_active: true },
    { role_id: 3, first_name: 'Driver', last_name: 'One', email: 'driver@transit.com', password_hash: hash, is_active: true },
    { role_id: 4, first_name: 'Financial', last_name: 'Analyst', email: 'analyst@transit.com', password_hash: hash, is_active: true },
  ];

  for (const u of users) {
    const exists = await prisma.users.findUnique({ where: { email: u.email } });
    if (!exists) {
      await prisma.users.create({ data: u });
    } else {
      await prisma.users.update({ where: { email: u.email }, data: u });
    }
  }
  
  console.log("Users created/updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
