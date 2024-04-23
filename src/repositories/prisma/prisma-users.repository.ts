// dependencies
import { prisma as prismaDatabase } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// interfaces
import { IUsersRepository } from "../users-repository.interface";

export class PrismaUserRepository implements IUsersRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await prismaDatabase.user.create({data});
        return user;
    }

    async findByEmail(email:string) {
        const user = await prismaDatabase.user.findUnique({
            where: { email }
        });
        return user;
    }
}
