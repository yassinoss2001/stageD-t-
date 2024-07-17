import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interfaces/category.interface';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto,@Res()response) {
    try {
      const newCategory = await this.categoriesService.create(createCategoryDto)
      return response.status(HttpStatus.CREATED).json({
        message :"category created successfully",
        status : HttpStatus.CREATED,
        data:newCategory
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        messgae:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
      
    }
  }

  @Get()
 async findAll(@Res() response): Promise<ICategory[]> {
    try {
      const categoriesData = await this.categoriesService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Categories found successfully',
        status: HttpStatus.OK,
        data: categoriesData
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message ,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string): Promise<ICategory> {
    try {
      const category = await this.categoriesService.findOne(id);

      return response.status(HttpStatus.OK).json({
        message: 'Category found successfully',
        status: HttpStatus.OK,
        data: category,
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
  async update(@Res() response, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoriesService.update(id, updateCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'Category updated successfully',
        status: HttpStatus.OK,
        data: updatedCategory,
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
      const deletedCategory = await this.categoriesService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Category deleted successfully',
        status: HttpStatus.OK,
        data: deletedCategory,
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
