// dependencies
import { CheckIn, Prisma } from "@prisma/client";
import { prisma as prismaDatabase } from "@/lib/prisma";

// interfaces
import { ICheckInRepository } from "../check-ins-repository.interface";

export class PrismaCheckInsRepository implements ICheckInRepository {
    async countByUserId(userId: string): Promise<number> {
        const checkIns = await prismaDatabase.checkIn.count({
            where: {
                user_id: userId
            }
        });

        return checkIns;
    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {
       const checkIn = await prismaDatabase.checkIn.create({ data });

       return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const checkIn = await prismaDatabase.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: date
            }
        })

        return checkIn || null;
    }
}