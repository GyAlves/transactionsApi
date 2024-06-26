// dependencies
import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByUserId(userId: string): Promise<number>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findById(checkInId: string): Promise<CheckIn | null>
    validateCheckIn(checkIn: CheckIn): Promise<CheckIn>
}