import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from 'src/project/interfaces/project.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('tasks') private taskModel: Model<ITask>,
    @InjectModel('projects') private projectModel: Model<IProject>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = new this.taskModel(createTaskDto);
    await this.projectModel.updateOne(
      { _id: createTaskDto.project },
      { $push: { projects: newTask._id } }
    );
    return await newTask.save();
  }

  async findAll(): Promise<ITask[]> {
    const tasksData = await this.taskModel.find().exec();

    if (!tasksData || tasksData.length === 0) {
      throw new NotFoundException('Tasks not found');
    }

    return tasksData;
  }

  async findOne(id: string): Promise<ITask> {
    const taskData = await this.taskModel.findById(id).exec();

    if (!taskData) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return taskData;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    const existingTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return existingTask;
  }

  async remove(id: string): Promise<ITask> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();

    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return deletedTask;
  }
}
