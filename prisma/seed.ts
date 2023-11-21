// Exemplo de uso de transação
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
    const categories = await prisma.$transaction([
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

    const [homeKitchen, clothingJewelry, electronics] = categories.map(category => category.id);

    await prisma.product.create({
        data: {
            title: 'Echo Dot (3rd Gen) - Smart speaker with Alexa',
            description: 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small spaces.',
            price: 29.99,
            image_url: 'https://m.media-amazon.com/images/G/01/apparel/rcxgs/tile._CB483369110_.gif',
            category_id: electronics,
        },
    });

    await prisma.product.create({
        data: {
            title: 'Another Product',
            description: 'Description of another product.',
            price: 19.99,
            image_url: 'https://example.com/another-product.jpg',
            category_id: homeKitchen,
        },
    });

    await prisma.product.create({
        data: {
            title: 'Yet Another Product',
            description: 'Description of yet another product.',
            price: 9.99,
            image_url: 'https://example.com/yet-another-product.jpg',
            category_id: clothingJewelry,
        },
    });

    const password_hash = await hash('12345678', 6);

    await prisma.user.create({
        data: {
            name: 'Administrador',
            email: 'admin@mail.pt',
            password_hash,
            role: 'ADMIN',
        },
    });

}
seed()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
