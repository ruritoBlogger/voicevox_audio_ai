import { prisma } from "./prisma";

async function main() {
  await prisma.comment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      content: "ずんだもんなのだ",
    },
  });

  await prisma.comment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      content: "よろしくなのだ",
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
