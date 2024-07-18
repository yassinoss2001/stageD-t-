import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Model } from 'mongoose';
import { IType } from './interfaces/type.interface';

@Injectable()
export class TypesService {
  constructor(@InjectModel("types")
  private typesModel : Model<IType>){

  }
  async create(createTypeDto: CreateTypeDto): Promise<IType> {
    const newType = new this.typesModel(createTypeDto);
    return await newType.save();
  }

  async findAll(): Promise<IType[]> {
    const typesData = await this.typesModel.find().exec();
    
    if (!typesData || typesData.length === 0) {
      throw new NotFoundException('Types not found');
    }

    return typesData;
  }

  async findOne(id: string): Promise<IType> {
    const typeData = await this.typesModel.findById(id).exec();
  
    if (!typeData) {
      throw new NotFoundException(`Type with ID ${id} is not found`);
    }
  
    return typeData;
  }
  
  async update(id: string, updateTypeDto: UpdateTypeDto): Promise<IType> {
    const existingType = await this.typesModel.findByIdAndUpdate(id, updateTypeDto, { new: true }).exec();

    if (!existingType) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }

    return existingType;
  }
  
  async remove(id: string) {
    const deletedType = await this.typesModel.findByIdAndDelete(id).exec();

    if (!deletedType) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }

    return deletedType;
  }
}
