import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      login: "test-user",
      passwordHash: "123456789",
      rating: 100,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      login: "test-user2",
      passwordHash: "123456789",
      rating: 50,
    },
  });

  await prisma.game.create({
    data: {
      status: "IDLE",
      field: Array(9).fill(null),
      players: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      status: "IDLE",
      field: Array(9).fill(null),
      players: {
        connect: {
          id: user2.id,
        },
      },
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
