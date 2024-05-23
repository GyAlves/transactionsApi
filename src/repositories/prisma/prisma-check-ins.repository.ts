// dependencies
import { CheckIn, Prisma } from "@prisma/client";
import { prisma as prismaDatabase } from "@/lib/prisma";
import dayjs from "dayjs";

// interfaces
import { ICheckInRepository } from "../check-ins-repository.interface";

export class PrismaCheckInsRepository implements ICheckInRepository {
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return await prismaDatabase.checkIn.findMany({
            where: { user_id: userId },
            take: 22,
            skip: (page - 1) * 22
        });
    }
    async findById(checkInId: string): Promise<CheckIn| null> {
        return await prismaDatabase.checkIn.findFirst({
            where: {
                id: checkInId
            }
        });
    }
    async validateCheckIn(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        return await prismaDatabase.checkIn.update({
            where: { id: checkIn.id },
            data: checkIn
        });
    }
    async countByUserId(userId: string): Promise<number> {
        return await prismaDatabase.checkIn.count({
            where: {
                user_id: userId
            }
        });
    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {
       return await prismaDatabase.checkIn.create({ data });
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        return await prismaDatabase.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })
    }
}