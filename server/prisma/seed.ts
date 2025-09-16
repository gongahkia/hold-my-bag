import { prisma } from "../src/config/database";

async function main() {
  // Add initial data if needed
  await prisma.user.create({
    data: { nickname: "SampleUser", createdAt: new Date(), lastActive: new Date() }
  });
}
main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());