import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError, z } from 'zod';
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error';
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    try {
        const { email, name, password } = registerBodySchema.parse(request.body);

        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({
            name,
            email,
            password
        });
    } catch (error) {

        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map((e) => {
                return {
                    path: e.path.join('.'),
                    message: e.message,
                };
            });

            return reply.status(400).send({
                error: 'Invalid request data',
                details: formattedErrors,
            });
        }
        else if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }

        throw error;
    }

    return reply.status(201).send();
}