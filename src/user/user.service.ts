import { UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './dtos/User.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,
    ) { }

    _getUserDetails(user: UserDocument): User {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    }

    async findByEmail(email: string): Promise<UserDocument | null> { 
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User> { 
        const user = await this.userModel.findById(id).exec();
        if (!user) return null;
        return this._getUserDetails(user); 
    }

    async create(userData: User): Promise<UserDocument> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
}
