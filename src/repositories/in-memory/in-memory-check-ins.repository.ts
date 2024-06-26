// dependencies
import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

// interfaces
import { ICheckInRepository } from "../check-ins-repository.interface";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInRepository {

    public items: CheckIn[] = [];
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date(),
        }

        this.items.push(checkIn);

        return checkIn;
    }   

    async countByUserId(userId: string): Promise<number> {
        const checkIns = this.items.filter(checkIn => checkIn.user_id === userId).length;
        return checkIns;
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const startOfTheDay = dayjs(date).startOf('day');
        const endOfTheDay = dayjs(date).endOf('day');

        const checkInOnSameDay = this.items.find(checkIn => {
            const checkInDate = dayjs(checkIn.created_at);

            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id === userId && isOnSameDate;

        });

        if(!checkInOnSameDay) return null;

        return checkInOnSameDay;

    }
    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {

        const checkIns = this.items
            .filter(checkIn => checkIn.user_id === userId)
            .slice((page - 1) * 20, page * 20);

        return checkIns;

    }

    async findById(checkInId: string) {
        const checkIn = this.items.find(checkIn => checkIn.id === checkInId);
        return checkIn || null;
    }

    async validateCheckIn(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(checkIn => checkIn.id === checkIn.id);

        if(checkInIndex >= 0) this.items[checkInIndex] = checkIn;

        return checkIn;
    }

}