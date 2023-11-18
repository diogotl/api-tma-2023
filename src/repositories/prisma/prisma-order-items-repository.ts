import { Prisma } from '@prisma/client';
import { OrderItemsRepository } from '../order-items-repository';
import { prisma } from '../../lib/prisma';


export class PrismaOrderItemsRepository implements OrderItemsRepository {
    create({ order_id, product_id, quantity, price }: Prisma.OrderItemUncheckedCreateInput): Promise<{ id: string; order_id: string; product_id: string; quantity: number; price: number; }> {
        // throw new Error('Method not implemented.');

        const orderItem = prisma.orderItem.create({
            data: {
                order_id,
                product_id,
                quantity,
                price
            }
        });

        return orderItem;
    }

}