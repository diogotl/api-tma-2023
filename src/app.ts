import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt'; '@fastify/jwt';
import { env } from './env';
import { appRoutes } from './http/routes';

export const app = fastify();

app.register(appRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});
