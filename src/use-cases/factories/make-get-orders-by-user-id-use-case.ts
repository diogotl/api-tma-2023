import { PrismaOrdersRepository } from '../../repositories/prisma/prisma-orders-repository';
import { GetOrdersByUserIdUseCase } from '../get-orders-by-user-id';

export function makeGetOrdersByUserIdUseCase() {
    const ordersRepository = new PrismaOrdersRepository();
    const getOrdersByUserIdUseCase = new GetOrdersByUserIdUseCase(ordersRepository);
    return getOrdersByUserIdUseCase;
}