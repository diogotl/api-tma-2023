import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateOrderUseCase } from '../../../use-cases/factories/make-create-order-use-case';

export async function createOrder(request: FastifyRequest, reply: FastifyReply) {

    // const { id } = request.headers;
    const userId = request.user.sub;
    const data = request.body;

    const createOrderUseCase = makeCreateOrderUseCase();

    const response = await createOrderUseCase.execute({
        userId,
        orderItems: data
    });


    return reply.status(200).send(
        response
    );
}