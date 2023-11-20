import { ProductsRepository } from '../repositories/products-repository';

export class ListProductsUseCase {

    constructor(
        private productsRepository: ProductsRepository
    ) { }

    public async execute() {

        const products = await this.productsRepository.list();

        return products;
    }
}