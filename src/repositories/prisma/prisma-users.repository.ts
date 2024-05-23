// dependencies
import { prisma as prismaDatabase } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// interfaces
import { IUsersRepository } from "../users-repository.interface";

export class PrismaUserRepository implements IUsersRepository {
    async findById(id: string) {
        return await prismaDatabase.user.findUnique({
            where: { id }
        });
    }

    async create(data: Prisma.UserCreateInput) {
        return await prismaDatabase.user.create({ data });
    }

    async findByEmail(email:string) {
        return await prismaDatabase.user.findUnique({
            where: { email }
        });
    }
}
