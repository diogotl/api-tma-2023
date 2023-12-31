import { ProductsRepository } from '../products-repository';
import { prisma } from '../../lib/prisma';
import { Prisma, Product } from '@prisma/client';

export class PrismaProductsRepository implements ProductsRepository {
    async exists(id: string): Promise<boolean> {

        const product = prisma.product.findFirst(
            { where: { id } }
        );

        return product.then(product => !!product);
    }
    async update(id: string, data: Prisma.ProductUncheckedUpdateInput): Promise<Product> {

        const product = await prisma.product.update({
            where: { id },
            data
        });

        return product;
    }
    async delete(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id }
        });
    }
    async create(data: Product): Promise<Product> {
        const product = await prisma.product.create({
            data
        });

        return product;
    }
    async list(): Promise<Product[]> {

        const products = await prisma.product.findMany({
            include: {
                category: true
            }
        });
        products.forEach(product => {
            product.price = Number(product.price) / 100;
        });
        return products;
    }

    async show(id: string): Promise<Product | null> {

        const product = await prisma.product.findFirst(
            { where: { id } }
        );

        if (product) {
            product.price = Number(product?.price) / 100;
        }

        return product;
    }
}