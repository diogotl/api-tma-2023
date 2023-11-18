import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { prisma } from '../../lib/prisma';

export class PrismaUsersRepository implements UsersRepository {
    async exists(id: string): Promise<boolean> {
        // throw new Error('Method not implemented.')

        const user = prisma.user.findFirst(
            { where: { id } }
        );

        return user.then(user => !!user);
    }

    async findById(id: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                id,
            }
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        });

        return user;
    }
}