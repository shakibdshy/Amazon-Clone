import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../user/dtos/User.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(user: UserDTO) {
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) return 'Email already exists';

        user.password = await this.hashPassword(user.password);

        const newUser = await this.userService.create(user);

        return this.userService._getUserDetails(newUser);
    }
    
}
