import { Order, Prisma } from '@prisma/client';

export interface OrdersRepository {
    create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>;
    getOrdersByUserId(userId: string): Promise<Order[]>;
}