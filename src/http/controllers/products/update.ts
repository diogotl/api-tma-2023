import { FastifyReply, FastifyRequest } from 'fastify';
import { makeUpdateProductUseCase } from '../../../use-cases/factories/make-update-product-use-case';
import { z } from 'zod';

type UpdateProductRequest = FastifyRequest<{
    Params: {
        id: string;
    }
}>;

export async function updateProduct(request: FastifyRequest, reply: FastifyReply) {

    const updateProductBodySchema = z.object({
        title: z.string().min(3),
        description: z.string().nullable(),
        price: z.number().positive(),
        image_url: z.string().url(),
        category_id: z.string(),
    });


    const { id } = request.params as UpdateProductRequest;

    const { title, description, price, image_url, category_id } = updateProductBodySchema.parse(request.body);

    const updateProductUseCase = makeUpdateProductUseCase();

    const product = await updateProductUseCase.execute(id, {
        title,
        description,
        price,
        image_url,
        category_id,
    });

    return reply.status(200).send(
        {
            message: 'Product updated successfully',
            product
        }
    );
}