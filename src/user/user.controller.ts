import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }
    
    @Get(':id')
    getUser(@Param('id') id: string): Promise<User | null> { 
        return this.UserService.findById(id);
    }
}
