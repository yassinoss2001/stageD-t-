import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger/dist/decorators';

@Controller('projects')
@ApiTags("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Swagger API documentation for the file upload request body
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        etat: { type: 'string' },
        duration: { type: 'string' },
        file: { type: 'string' },
        category: { type: 'string' },
      },
    },
  })
  // Indicates that this route consumes multipart/form-data
  @ApiConsumes("multipart/form-data")

  // Intercept file uploads and store them using disk storage
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/projects',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`)
      })
    })
  )

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() response,
  @UploadedFile() file:Express.Multer.File) {
    try {
      createProjectDto.file=file.filename
      const newProject = await this.projectService.create(createProjectDto);
      return response.status(HttpStatus.CREATED).json({
        message: "Project created successfully",
        status: HttpStatus.CREATED,
        data: newProject
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
  async findAll(@Res() response){
    try {
      const projectsData = await this.projectService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Projects found successfully',
        status: HttpStatus.OK,
        data: projectsData
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
      const project = await this.projectService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Project found successfully',
        status: HttpStatus.OK,
        data: project,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }




  // Swagger API documentation for the file upload request body
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        etat: { type: 'string' },
        duration: { type: 'string' },
        file: { type: 'string' },
        category: { type: 'string' },
      },
    },
  })
  // Indicates that this route consumes multipart/form-data
  @ApiConsumes("multipart/form-data")

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/projects',
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`)
      })
    })
  )




  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto , @Res() response,@UploadedFile() file:Express.Multer.File  ) {
    try {
      updateProjectDto.file=file?.filename
      const updatedProject = await this.projectService.update(id, updateProjectDto);
      return response.status(HttpStatus.OK).json({
        message: 'Project updated successfully',
        status: HttpStatus.OK,
        data: updatedProject,
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
      const deletedProject = await this.projectService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Project deleted successfully',
        status: HttpStatus.OK,
        data: deletedProject,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get('category/:categoryId')
  async findProjectsByCategory(@Res() response, @Param('categoryId') categoryId: string) {
    try {
      const projects = await this.projectService.findProjectsByCategory(categoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Projects found successfully',
        status: HttpStatus.OK,
        data: projects
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
