import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel("categories")
  private categoriesModel : Model<ICategory>){

  }
  async create(createCategoryDto: CreateCategoryDto):Promise<ICategory>{
    const newCategory = new this.categoriesModel(createCategoryDto);
    return await newCategory.save();
  }

  async findAll(): Promise<ICategory[]> {
    const categoriesData = await this.categoriesModel.find().exec();
    
    if (!categoriesData || categoriesData.length === 0) {
      throw new NotFoundException('Categories not found');
    }

    return categoriesData;
  }

  async findOne(id: string): Promise<ICategory> {
    const categoryData = await this.categoriesModel.findById(id).exec();
  
    if (!categoryData) {
      throw new NotFoundException(`this category ${id} is not found`);
    }
  
    return categoryData;
  }
  
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
    const existingCategory = await this.categoriesModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return existingCategory;
  }
  async remove(id: string){
    const deletedCategory = await this.categoriesModel.findByIdAndDelete(id).exec();

    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return deletedCategory;
  }
}
