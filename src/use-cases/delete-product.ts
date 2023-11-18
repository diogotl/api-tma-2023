import { ProductsRepository } from '../repositories/products-repository';
import { ProductNotFound } from './errors/product-not-found';

export class DeleteProductUseCase {

    constructor(
        private productsRepository: ProductsRepository,
    ) { }

    public async execute(id: string) {

        const doesProductExists = await this.productsRepository.exists(id);

        if (!doesProductExists) {
            throw new ProductNotFound();
        }

        await this.productsRepository.delete(id);

        return;
    }

}