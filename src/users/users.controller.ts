import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        status: HttpStatus.CREATED,
        data: newUser
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      });
    }
  }

  @Get()
  async findAll(@Res() response): Promise<IUser[]> {
    try {
      const usersData = await this.usersService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Users found successfully',
        status: HttpStatus.OK,
        data: usersData
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null
      });
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string): Promise<IUser> {
    try {
      const user = await this.usersService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        status: HttpStatus.OK,
        data: user
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null
      });
    }
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        status: HttpStatus.OK,
        data: updatedUser
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null
      });
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        status: HttpStatus.OK,
        data: deletedUser
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null
      });
    }
  }
}
