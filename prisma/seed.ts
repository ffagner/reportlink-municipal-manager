
import { PrismaClient } from '@prisma/client';
import { reports } from '../src/lib/reportData';

const prisma = new PrismaClient();

async function main() {
  // Create municipalities
  const municipalities = [
    { id: 'mun1', name: 'São Paulo' },
    { id: 'mun2', name: 'Rio de Janeiro' },
    { id: 'mun3', name: 'Belo Horizonte' },
    { id: 'mun4', name: 'Salvador' },
    { id: 'mun5', name: 'Brasília' },
    { id: 'all', name: 'Todos os Municípios' },
  ];

  console.log('Seeding municipalities...');
  for (const mun of municipalities) {
    await prisma.municipality.upsert({
      where: { id: mun.id },
      update: {},
      create: {
        id: mun.id,
        name: mun.name,
      },
    });
  }

  console.log('Seeding reports...');
  for (const report of reports) {
    await prisma.report.upsert({
      where: { id: report.id },
      update: {},
      create: {
        id: report.id,
        title: report.title,
        description: report.description,
        url: report.url,
        category: report.category,
        date: new Date(report.date),
        thumbnail: report.thumbnail,
        municipalityId: report.municipalityId,
      },
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
