import { Prisma, Product } from '@prisma/client';

export interface ProductsRepository {
    exists(id: string): Promise<boolean>;
    list(): Promise<Product[]>;
    show(id: string): Promise<Product | null>;
    create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
    update(id: string, data: Prisma.ProductUncheckedUpdateInput): Promise<Product | null>;
    delete(id: string): Promise<void>;
    // update(id: string, data: Product): Promise<Product | null>;
}