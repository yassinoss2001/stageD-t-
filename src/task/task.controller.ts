import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() response) {
    try {
      const newTask = await this.taskService.create(createTaskDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Task created successfully',
        status: HttpStatus.CREATED,
        data: newTask,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get()
  async findAll(@Res() response): Promise<ITask[]> {
    try {
      const tasksData = await this.taskService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Tasks found successfully',
        status: HttpStatus.OK,
        data: tasksData,
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
      const task = await this.taskService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Task found successfully',
        status: HttpStatus.OK,
        data: task,
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
  async update(@Res() response, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const updatedTask = await this.taskService.update(id, updateTaskDto);
      return response.status(HttpStatus.OK).json({
        message: 'Task updated successfully',
        status: HttpStatus.OK,
        data: updatedTask,
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
      const deletedTask = await this.taskService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Task deleted successfully',
        status: HttpStatus.OK,
        data: deletedTask,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }
  }

  @Get('by-project/:projectId')
  async findByProject(@Res() response, @Param('projectId') projectId: string) {
    try {
      const tasks = await this.taskService.findByProject(projectId);
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


  @Get('by-user/:userId')
  async findByUser(@Res() response, @Param('userId') userId: string) {
    try {
      const tasks = await this.taskService.findTaskByUserId(userId);
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
