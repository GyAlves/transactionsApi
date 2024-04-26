// dependencies
import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByUserId(userId: string): Promise<number>
}