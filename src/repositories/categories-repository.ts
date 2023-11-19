import { Prisma, Category } from '@prisma/client';

export interface CategoriesRepository {
    create(data: Prisma.CategoryUncheckedCreateInput): Promise<Category>;
    list(): Promise<Category[]>;
    exists(id: string): Promise<boolean>;
}   