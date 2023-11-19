import { Prisma } from '@prisma/client';
import { CategoriesRepository } from '../categories-repository';
import { prisma } from '../../lib/prisma';

export class PrismaCategoriesRepository implements CategoriesRepository {
    create(data: Prisma.CategoryUncheckedCreateInput): Promise<{ id: string; name: string; created_at: Date; updated_at: Date; }> {

        const category = prisma.category.create({
            data
        });

        return category;
    }
    list(): Promise<{ id: string; name: string; created_at: Date; updated_at: Date; }[]> {

        const categories = prisma.category.findMany();

        return categories;
    }
    exists(id: string): Promise<boolean> {

        const category = prisma.category.findFirst(
            { where: { id } }
        );

        return category.then(category => !!category);
    }

}