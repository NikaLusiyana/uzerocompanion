import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = [
    'Fantasy',
    'Science Fiction',
    'Romance',
    'Mystery',
    'Thriller',
    'Historical',
    'Adventure',
    'Horror',
    'Drama',
    'Slice of Life'
  ];

  for (const name of genres) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  console.log('✅ Genre seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
