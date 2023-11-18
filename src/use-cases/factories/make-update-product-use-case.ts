import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository';
import { UpdateProductUseCase } from '../update-product';

export function makeUpdateProductUseCase() {

    const productsRepository = new PrismaProductsRepository();
    const updateProductUseCase = new UpdateProductUseCase(productsRepository);

    return updateProductUseCase;
}