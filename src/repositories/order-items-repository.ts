import { Prisma, OrderItem } from '@prisma/client';

export interface OrderItemsRepository {
    create(data: Prisma.OrderItemUncheckedCreateInput): Promise<OrderItem>;
}   