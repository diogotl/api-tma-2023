import { PrismaCategoriesRepository } from '../../repositories/prisma/prisma-categories-repository';
import { ListCategoriesUseCase } from '../list-categories';

export function makeListCategoriesUseCase() {
    const categoriesRepository = new PrismaCategoriesRepository();
    const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
    return listCategoriesUseCase;
}