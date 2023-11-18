import { ProductsRepository } from '../repositories/products-repository';

export class ShowProductUseCase {
    constructor(
        private productsRepository: ProductsRepository,
    ) { }

    public async execute(id: string) {
        const doesProductExists = await this.productsRepository.exists(id);

        if (!doesProductExists) {
            throw new Error('Product not found');
        }

        const product = await this.productsRepository.show(id);

        return product;
    }

}