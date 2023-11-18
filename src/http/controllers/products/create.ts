import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeCreateProductUseCase } from '../../../use-cases/factories/make-create-product-use-case';

export async function createProduct(request: FastifyRequest, reply: FastifyReply) {

    const createProductBodySchema = z.object({
        title: z.string().min(3),
        description: z.string().nullable(),
        price: z.number().positive(),
        image_url: z.string().url(),
        category_id: z.string(),
    });

    const { title, description, image_url, price, category_id } = createProductBodySchema.parse(request.body);

    const createProductUseCase = makeCreateProductUseCase();

    const product = await createProductUseCase.execute({
        title,
        description,
        price,
        image_url,
        category_id
    });

    return reply.status(201).send(product);
}