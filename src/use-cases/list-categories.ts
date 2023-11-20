import { CategoriesRepository } from '../repositories/categories-repository';

export class ListCategoriesUseCase {

    constructor(
        private categoriesRepository: CategoriesRepository
    ) { }

    public async execute() {

        const categories = await this.categoriesRepository.list();

        return categories;
    }
}