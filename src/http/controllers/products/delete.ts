import { FastifyReply, FastifyRequest } from 'fastify';
import { makeDeleteProductUseCase } from '../../../use-cases/factories/make-delete-product-use-case';

type DeleteProductRequest = FastifyRequest<{
    Params: {
        id: string;
    }
}>;

export async function deleteProduct(request: DeleteProductRequest, reply: FastifyReply) {

    const { id } = request.params;

    const deleteProductUseCase = makeDeleteProductUseCase();

    await deleteProductUseCase.execute(id);

    return reply.status(200).send(
        {
            message: 'Product deleted successfully'
        }
    );
}