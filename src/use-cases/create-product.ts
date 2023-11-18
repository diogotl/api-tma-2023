import { ProductsRepository } from '../repositories/products-repository';

export interface CreateProductUseCaseRequest {
    title: string
    description: string | null
    price: number
    image_url: string
    category_id: string
}

export class CreateProductUseCase {
    constructor(
        private productsRepository: ProductsRepository,
    ) { }

    public async execute({ title, description, image_url, price, category_id }: CreateProductUseCaseRequest) {

        const product = await this.productsRepository.create({
            title,
            description,
            image_url,
            price,
            category_id
        });

        return product;
    }
}