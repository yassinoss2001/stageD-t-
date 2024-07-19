import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Model } from 'mongoose';
import { IPermission } from './interfaces/permission.interface';
import { IType } from 'src/types/interfaces/type.interface';
import { CreateTypeDto } from 'src/types/dto/create-type.dto';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel("permissions")
  private permissionsModel: Model<IPermission>,
  @InjectModel("types")
    private typeModel: Model<IType>
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<IPermission> {
    const newPermission = new this.permissionsModel(createPermissionDto);
    await this.typeModel.updateOne({_id:createPermissionDto.type},{$push:{permissions:newPermission._id}})

    return await newPermission.save();
  }

  async findAll(): Promise<IPermission[]> {
    const permissionsData = await this.permissionsModel.find().exec();
    
    if (!permissionsData || permissionsData.length === 0) {
      throw new NotFoundException('Permissions not found');
    }

    return permissionsData;
  }

  async findOne(id: string): Promise<IPermission> {
    const permissionData = await this.permissionsModel.findById(id).exec();
  
    if (!permissionData) {
      throw new NotFoundException(`Permission with ID ${id} is not found`);
    }
  
    return permissionData;
  }
  
  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<IPermission> {
    const existingPermission = await this.permissionsModel.findByIdAndUpdate(id, updatePermissionDto, { new: true }).exec();

    if (!existingPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return existingPermission;
  }
  
  async remove(id: string): Promise<IPermission> {
    const deletedPermission = await this.permissionsModel.findByIdAndDelete(id).exec();

    if (!deletedPermission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    await this.typeModel.updateOne(
      { _id: deletedPermission.type },
      { $pull: { permissions: id } }
    );

    return deletedPermission;
  }

  async findByType(typeId: string): Promise<IPermission[]> {
    const permissions = await this.permissionsModel.find({ type: typeId }).exec();

    if (!permissions || permissions.length === 0) {
      throw new NotFoundException(`No permissions found for type with ID ${typeId}`);
    }

    return permissions;
  }

}
