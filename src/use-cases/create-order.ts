import { OrderItem } from '@prisma/client';
import { OrderItemsRepository } from '../repositories/order-items-repository';
import { OrdersRepository } from '../repositories/orders-repository';
import { ProductsRepository } from '../repositories/products-repository';
import { UsersRepository } from '../repositories/users-repository';

interface OrderItemsProps {
    product_id: string,
    quantity: number,
    price: number,
}

interface CreateOrderUseCaseProps {
    userId: string,
    orderItems: Array<OrderItemsProps>,
}

export class CreateOrderUseCase {

    constructor(
        private ordersRepository: OrdersRepository,
        private productsRepository: ProductsRepository,
        private usersRepository: UsersRepository,
        private orderItemsRepository: OrderItemsRepository,
    ) { }

    public async execute({ userId, orderItems }: CreateOrderUseCaseProps) {

        const doestUserExists = await this.usersRepository.exists(userId);

        if (!doestUserExists) {
            throw new Error('User not found');
        }

        // const productsExists = await this.productsRepository.listByIds(products);
        const order = await this.ordersRepository.create({
            user_id: userId
        });

        const total: OrderItem[] = [];

        for (const item of orderItems) {

            const doesProductExists = await this.productsRepository.exists(item.product_id);

            if (!doesProductExists) {
                throw new Error('O produto não existe');
            }

            const orderItem = await this.orderItemsRepository.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price * 100,
            });

            const orderItemFormatted = {
                ...orderItem,
                price: Number(orderItem.price) / 100,
            };

            console.log(orderItem);

            total.push(orderItemFormatted);
        }

        const orderWithItems = {
            order: {
                id: order.id,
                user_id: order.user_id,
            },
            orderItems: total
        };

        return orderWithItems;
    }
}