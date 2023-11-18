import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJWT } from './middlewares/verify.jwt';
import { listProducts } from './controllers/products/list';
import { createProduct } from './controllers/products/create';
import { showProduct } from './controllers/products/show';
// import { deleteProduct } from './controllers/products/delete';
import { updateProduct } from './controllers/products/update';
import { getOrdersByUserId } from './controllers/orders/list-orders';
import { createOrder } from './controllers/orders/create-order';

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register);
    app.post('/sessions', authenticate);
    app.get('/profile', { onRequest: [verifyJWT] }, profile);
    app.get('/products', listProducts);
    app.post('/products', { onRequest: [verifyJWT] }, createProduct);
    app.get('/products/:id', showProduct);
    // app.delete('/products/:id', { onRequest: [verifyJWT] }, deleteProduct);
    app.put('/products/:id', { onRequest: [verifyJWT] }, updateProduct);
    // app.patch('/products/:id', { onRequest: [verifyJWT] }, deleteProduct);
    app.post('/orders', { onRequest: [verifyJWT] }, createOrder);
    app.get('/orders', { onRequest: [verifyJWT] }, getOrdersByUserId);
}
