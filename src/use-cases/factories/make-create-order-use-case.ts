import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository';
import { PrismaProductsRepository } from '../../repositories/prisma/prisma-products-repository';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { PrismaOrderItemsRepository } from '../../repositories/prisma/prisma-order-items-repository';
import { CreateOrderUseCase } from '../create-order';

export function makeCreateOrderUseCase() {

    const ordersRepository = new PrismaOrdersRepository();
    const productsRepository = new PrismaProductsRepository();
    const usersRepository = new PrismaUsersRepository();
    const orderitemsRepository = new PrismaOrderItemsRepository();

    const createOrderUseCase = new CreateOrderUseCase(
        ordersRepository,
        productsRepository,
        usersRepository,
        orderitemsRepository
    );

    return createOrderUseCase;
}