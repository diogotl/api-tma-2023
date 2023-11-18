import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { OrdersRepository } from '../orders-repository';

export class PrismaOrdersRepository implements OrdersRepository {
    create({ user_id }: Prisma.OrderUncheckedCreateInput): Promise<{ id: string; user_id: string; }> {

        const order = prisma.order.create({
            data: {
                user_id
            }
        });

        return order;
    }

    async getOrdersByUserId(userId: string): Promise<{ id: string; user_id: string; }[]> {

        const orders = prisma.order.findMany({
            where: { user_id: userId },
            include: {
                orderItem: true,
            }
        });

        return orders;
    }
}