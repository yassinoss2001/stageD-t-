import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IPermission } from './interfaces/permission.interface';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Controller('permissions')
@ApiTags("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto, @Res() response) {
    try {
      const newPermission = await this.permissionsService.create(createPermissionDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Permission created successfully",
        status: HttpStatus.CREATED,
        data: newPermission
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
  async findAll(@Res() response) {
    try {
      const permissionsData = await this.permissionsService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Permissions found successfully',
        status: HttpStatus.OK,
        data: permissionsData
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
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const permission = await this.permissionsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Permission found successfully',
        status: HttpStatus.OK,
        data: permission,
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
  async update(@Res() response, @Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    try {
      const updatedPermission = await this.permissionsService.update(id, updatePermissionDto);
      return response.status(HttpStatus.OK).json({
        message: 'Permission updated successfully',
        status: HttpStatus.OK,
        data: updatedPermission,
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
      const deletedPermission = await this.permissionsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Permission deleted successfully',
        status: HttpStatus.OK,
        data: deletedPermission,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get('by-type/:typeId')
  async findByType(@Res() response, @Param('typeId') typeId: string) {
    try {
      const permissions = await this.permissionsService.findByType(typeId);
      return response.status(HttpStatus.OK).json({
        message: 'Permissions found successfully',
        status: HttpStatus.OK,
        data: permissions,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get('by-user/:userId')
  async findByUser(@Res() response, @Param('userId') userId: string) {
    try {
      const tasks = await this.permissionsService.findPermissionsByUserId(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Tasks found successfully',
        status: HttpStatus.OK,
        data: tasks,
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
