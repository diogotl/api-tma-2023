import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetOrdersByUserIdUseCase } from '../../../use-cases/factories/make-get-orders-by-user-id-use-case';


export async function getOrdersByUserId(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.user.sub;

    const getOrdersByUserIdUseCase = makeGetOrdersByUserIdUseCase();

    const orders = await getOrdersByUserIdUseCase.execute({
        userId: id
    });

    return reply.status(200).send(
        orders
    );

}