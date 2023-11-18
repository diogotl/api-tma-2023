import { OrderItemsRepository } from '../repositories/order-items-repository';
import { OrdersRepository } from '../repositories/orders-repository';
import { ProductsRepository } from '../repositories/products-repository';
import { UsersRepository } from '../repositories/users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface OrderItemsProps {
    product_id: string,

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

        const total = [];

        orderItems.map(async (item: any) => {

            const doesProductExists = await this.productsRepository.exists(item.product_id);

            if (!doesProductExists) {
                // throw new Error('O produto não existe');
                throw new UserAlreadyExistsError();

            }

            const orderItem = await this.orderItemsRepository.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price
            });

            console.log(orderItem);

            total.push(orderItem);
        });

        console.log(total);

        return {
            userId,
            total
        };

    }
}