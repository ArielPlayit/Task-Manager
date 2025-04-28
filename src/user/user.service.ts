import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
){}

async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
        throw new NotFoundException(`There is not an user with this ${email}`)
    }
    return user;
}

async updateUsername(email: string, newFullName: string): Promise<User> {
    const user = await this.findOne(email);
    user.fullName = newFullName;
    await this.userRepository.save(user)
    return user;
}


}