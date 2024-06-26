//dependencies
import { Prisma, User } from "@prisma/client";

//interfaces
import { IUsersRepository } from "../users-repository.interface";

export class InMemoryUserRepository implements IUsersRepository {

    public items: User[] = [];
    async create(data: Prisma.UserCreateInput) {

        const user = {
            id: 'user-1',
            name: data.name,    
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.items.push(user);

        return user;
        
    }
    async findByEmail(email: string) {
        
        const user = this.items.find(user => user.email === email);
        if(!user) return null;
        
        return user;
    }

    async findById(id: string) {

        const user = this.items.find(user => user.id === id);
        if(!user) return null;
        
        return user;
    }
    
}