import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteProductUseCase } from '../../../use-cases/factories/make-delete-product-use-case';
import { ProductNotFound } from '../../../use-cases/errors/product-not-found';

type DeleteProductRequest = FastifyRequest<{
    Params: {
        id: string;
    }
}>;

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply) {

    const { id } = request.params as DeleteProductRequest;

    try {
        const deleteProductUseCase = makeDeleteProductUseCase();

        await deleteProductUseCase.execute(id);

    } catch (err) {
        if (err instanceof ProductNotFound) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }

    return reply.status(201).send(
        {
            message: 'Product deleted successfully'
        }
    );
}