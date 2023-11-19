// Exemplo de uso de transação
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
    await prisma.$transaction([
        prisma.category.create({
            data: {
                name: 'Home & Kitchen',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Clothing, Shoes & Jewelry',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Electronics',
            },
        }),
    ]);
}

seed()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
