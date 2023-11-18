import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository';
import { ShowProductUseCase } from '../show-product';

export function makeShowProductUseCase() {

    const productsRepository = new PrismaProductsRepository();
    const showProductUseCase = new ShowProductUseCase(productsRepository);

    return showProductUseCase;
}