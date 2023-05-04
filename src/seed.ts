import { prisma } from "./prisma";

async function main() {
  await prisma.comment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      content: "ずんだもんなのだ",
      author: "AI",
    },
  });

  await prisma.comment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      content: "よろしくなのだ",
      author: "AI",
    },
  });

  await prisma.comment.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      content: "今日の天気を教えて",
      author: "USER",
    },
  });

  await prisma.comment.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      content: "今日は晴れなのだ",
      author: "AI",
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
