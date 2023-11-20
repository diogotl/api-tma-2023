import { FastifyReply, FastifyRequest } from 'fastify';
import { makeListCategoriesUseCase } from '../../../use-cases/factories/make-list-categories-use-case';

export async function listCategories(request: FastifyRequest, reply: FastifyReply) {

    const listCategoriesUseCase = makeListCategoriesUseCase();

    const response = await listCategoriesUseCase.execute();

    return reply.status(200).send(
        response
    );
}