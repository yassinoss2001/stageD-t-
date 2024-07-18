import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { IType } from './interfaces/type.interface';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto, @Res() response) {
    try {
      const newType = await this.typesService.create(createTypeDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Type created successfully",
        status: HttpStatus.CREATED,
        data: newType
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
  async findAll(@Res() response): Promise<IType[]> {
    try {
      const typesData = await this.typesService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Types found successfully',
        status: HttpStatus.OK,
        data: typesData
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string): Promise<IType> {
    try {
      const type = await this.typesService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Type found successfully',
        status: HttpStatus.OK,
        data: type,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    try {
      const updatedType = await this.typesService.update(id, updateTypeDto);
      return response.status(HttpStatus.OK).json({
        message: 'Type updated successfully',
        status: HttpStatus.OK,
        data: updatedType,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const deletedType = await this.typesService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Type deleted successfully',
        status: HttpStatus.OK,
        data: deletedType,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }
}
