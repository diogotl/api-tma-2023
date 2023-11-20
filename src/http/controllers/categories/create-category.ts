import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export function CreateCategory(request: FastifyRequest, response: FastifyReply) {

    const createCategoryBodySchema = z.object({
        name: z.string().min(3),
    });

    const { name } = createCategoryBodySchema.parse(request.body);

    // const category = makeCate

    return response.status(201).send(name);

}
