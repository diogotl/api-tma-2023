import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';


import { AuthenticateUseCase } from '../../use-cases/authenticate';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { InvalidCredentialsError } from '../../use-cases/errors/invalid-credentials-error';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const authenticateUseCase = new AuthenticateUseCase(usersRepository);

        const { user } = await authenticateUseCase.execute({
            email,
            password
        });

        const token = await reply.jwtSign({
            role: user.role,
        }, {
            sign: {
                sub: user.id,
            },
        });

        console.log(token);

        const refreshToken = await reply.jwtSign({
            role: user.role,
        }, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            },
        });

        console.log(token);

        return reply
            .setCookie('refreshCookie', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            }).status(200).send({ 'token': token });



    } catch (error) {

        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }

        throw error;

    }
}