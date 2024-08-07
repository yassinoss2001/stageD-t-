import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger/dist';

@Controller('users')
@ApiTags("users")
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

  @Get('role')
  async getUserByRole(@Res() response, @Query('role') role: string) {
    try {
      const users = await this.usersService.getUserByRole(role);
      return response.status(HttpStatus.OK).json({
        message: 'Users found successfully',
        status: HttpStatus.OK,
        data: users,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
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


  @Get('by-email')
  async findOneByEmail(@Res() response , @Query('email') email: string) {
    try {
      if (!email) {
        throw new NotFoundException('Email query parameter is required');
      }
      const user = await this.usersService.findOneByEmail(email);
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
  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string){
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
