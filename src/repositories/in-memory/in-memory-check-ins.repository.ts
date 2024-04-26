// dependencies
import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

// interfaces
import { ICheckInRepository } from "../check-ins-repository.interface";

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

}