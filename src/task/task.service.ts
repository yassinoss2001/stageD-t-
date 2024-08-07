
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProject } from 'src/project/interfaces/project.interface';
import { IUser } from 'src/users/interfaces/user.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('tasks') private taskModel: Model<ITask>,
    @InjectModel('projects') private projectModel: Model<IProject>,
    @InjectModel('users') private userModel: Model<IUser>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = new this.taskModel(createTaskDto);
    const savedTask = await newTask.save();
    
    await this.projectModel.updateOne(
      { _id: createTaskDto.project },
      { $push: { tasks: savedTask._id } }
    );
    
    await this.userModel.updateOne(
      { _id: createTaskDto.user },
      { $push: { tasks: savedTask._id } }
    );

    return savedTask;
  }

  async findAll(): Promise<ITask[]> {
    const tasksData = await this.taskModel.find().populate('project').populate('user').exec();

    if (!tasksData || tasksData.length === 0) {
      throw new NotFoundException('Tasks not found');
    }

    return tasksData;
  }

  async findOne(id: string): Promise<ITask> {
    const taskData = await this.taskModel.findById(id).populate('project').populate('user').exec();

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

    await this.projectModel.updateOne(
      { _id: deletedTask.project },
      { $pull: { tasks: id } }
    );

    await this.userModel.updateOne(
      { _id: deletedTask.user },
      { $pull: { tasks: id } }
    );

    return deletedTask;
  }

  async findByProject(projectId: string): Promise<ITask[]> {
    const tasks = await this.taskModel.find({ project: projectId }).populate('project').populate('user').exec();

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found for project with ID ${projectId}`);
    }

    return tasks;
  }

  async findTaskByUserId(userId: string): Promise<ITask[]> {
    const tasks = await this.taskModel.find({ user: userId }).populate('project').populate('user').exec();

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found for user with ID ${userId}`);
    }

    return tasks;
  }


}
