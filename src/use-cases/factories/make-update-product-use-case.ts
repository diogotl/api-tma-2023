import { PrismaCategoriesRepository } from '../../repositories/prisma/prisma-categories-repository';
import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository';
import { UpdateProductUseCase } from '../update-product';

export function makeUpdateProductUseCase() {

    const productsRepository = new PrismaProductsRepository();
    const categoriesRepository = new PrismaCategoriesRepository();
    const updateProductUseCase = new UpdateProductUseCase(productsRepository, categoriesRepository);

    return updateProductUseCase;
}