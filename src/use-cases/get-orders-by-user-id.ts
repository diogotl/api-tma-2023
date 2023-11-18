import { Order } from '@prisma/client';
import { PrismaOrdersRepository } from '../repositories/prisma/prisma-orders-repository';

interface GetOrdersByUserIdUseCaseRequest {
    userId: string;
}

interface GetOrdersByUserIdUseCaseResponse {
    orders: Order[];
}

export class GetOrdersByUserIdUseCase {
    constructor(
        private ordersRepository: PrismaOrdersRepository
    ) { }

    async execute({ userId }: GetOrdersByUserIdUseCaseRequest): Promise<GetOrdersByUserIdUseCaseResponse> {

        const orders = await this.ordersRepository.getOrdersByUserId(userId);

        return {
            orders
        };
    }
}