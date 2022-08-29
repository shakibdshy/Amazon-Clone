import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.interface';
import { ExistingUserDTO } from '../user/dtos/existingUser.dto';
import { UserDTO } from '../user/dtos/User.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

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

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> { 
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(user: ExistingUserDTO): Promise<User | null> { 
        const existingUser = await this.userService.findByEmail(user.email);
        if (!existingUser) return null;

        const isPasswordMatching = await this.doesPasswordMatch(user.password, existingUser.password);
        if (!isPasswordMatching) return null;

        return this.userService._getUserDetails(existingUser);
    }

    async login(user: ExistingUserDTO): Promise<{ token: string | null }> {
        const validatedUser = await this.validateUser(user);
        if (!validatedUser) return { token: null };

        const token = await this.jwtService.signAsync({ id: validatedUser.id });

        return { token };
    }
    
}
