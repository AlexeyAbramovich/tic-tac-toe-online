import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      login: "test-user",
      passwordHash: "123456789",
      rating: 100,
    },
  });

  await prisma.user.create({
    data: {
      login: "test-user2",
      passwordHash: "123456789",
      rating: 50,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
