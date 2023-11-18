import { Prisma } from '@prisma/client';
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository';

export class UpdateProductUseCase {

    constructor(
        private productsRepository: PrismaProductsRepository,
    ) { }

    public async execute(id: string, data: Prisma.ProductUncheckedUpdateInput) {

        const doesProductExists = await this.productsRepository.exists(id);

        if (!doesProductExists) {
            throw new Error('Product not found');
        }

        const product = await this.productsRepository.update(id, data);

        return product;
    }

}