
import { PrismaCategoriesRepository } from '../repositories/prisma/prisma-categories-repository';
import { PrismaProductsRepository } from '../repositories/prisma/prisma-products-repository';

type Product = {
    title: string;
    description: string | null;
    image_url: string;
    price: number;
    category_id: string;
}

export class UpdateProductUseCase {

    constructor(
        private productsRepository: PrismaProductsRepository,
        private categoriesRepository: PrismaCategoriesRepository
    ) { }

    public async execute(id: string, data: Product) {

        const doesProductExists = await this.productsRepository.exists(id);

        if (!doesProductExists) {
            throw new Error('Product not found');
        }

        const doesCategoryExists = await this.categoriesRepository.exists(data.category_id);

        if (!doesCategoryExists) {
            throw new Error('Category not found');
        }

        const productFormatted = {
            ...data,
            price: Number(data.price * 100),
        };

        const product = await this.productsRepository.update(id, productFormatted);

        return product;
    }

}