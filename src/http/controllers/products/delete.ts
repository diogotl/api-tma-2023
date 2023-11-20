import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteProductUseCase } from '../../../use-cases/factories/make-delete-product-use-case';

type DeleteProductRequest = FastifyRequest<{
    Params: {
        id: string;
    }
}>;

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as DeleteProductRequest;

    const deleteProductUseCase = makeDeleteProductUseCase();

    await deleteProductUseCase.execute(id);

    return reply.status(201).send(
        {
            message: 'Product deleted successfully'
        }
    );
}