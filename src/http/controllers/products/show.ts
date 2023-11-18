import { FastifyReply, FastifyRequest } from 'fastify';
import { makeShowProductUseCase } from '../../../use-cases/factories/make-show-use-case';

type ShowProductRequest = FastifyRequest<{
    Params: {
        id: string;
    }
}>;

export async function showProduct(request: ShowProductRequest, reply: FastifyReply) {

    const { id } = request.params;

    const showProductUseCase = makeShowProductUseCase();

    const product = await showProductUseCase.execute(id);

    return reply.status(200).send(product);

}