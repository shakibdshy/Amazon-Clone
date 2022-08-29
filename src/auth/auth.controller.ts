import { ExistingUserDTO } from './../user/dtos/existingUser.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '../user/user.interface';
import { UserDTO } from '../user/dtos/User.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() userData: UserDTO) {
        return this.authService.register(userData);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userData: ExistingUserDTO): Promise<{ token: string } | null> {
        return this.authService.login(userData);
    }
}
