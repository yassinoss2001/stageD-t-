import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    const usersData = await this.userModel.find().exec();

    if (!usersData || usersData.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return usersData;
  }

  async findOne(id: string): Promise<IUser> {
    const userData = await this.userModel.findById(id).exec();

    if (!userData) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return userData;
  }



  async findOneByEmail(email: string): Promise<IUser> {
    const userData = await this.userModel.findOne({ email }).exec();
  
    if (!userData) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  
    return userData;
  }
  


  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return existingUser;
  }

  async remove(id: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
