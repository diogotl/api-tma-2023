import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { env } from './env';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import cors from '@fastify/cors';


export const app = fastify();

app.register(cors, {
    origin: true,
});
app.register(appRoutes);
app.register(fastifyCookie);
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    }
});



app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() });
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});