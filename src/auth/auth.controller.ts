import { Body, Controller, Post } from '@nestjs/common';
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
}
