import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Model } from 'mongoose';
import { IProject } from './interfaces/project.interface';
import { ICategory } from 'src/categories/interfaces/category.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('projects')
    private projectModel: Model<IProject>,
    @InjectModel("categories")
    private categoryModel: Model<ICategory>
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<IProject> {
    const newProject = new this.projectModel(createProjectDto);
    await this.categoryModel.updateOne({_id:createProjectDto.category},{$push:{projects:newProject._id}})
    return await newProject.save();
  }

  async findAll(): Promise<IProject[]> {
    const projectsData = await this.projectModel.find().exec();

    if (!projectsData || projectsData.length === 0) {
      throw new NotFoundException('Projects not found');
    }

    return projectsData;
  }

  async findOne(id: string): Promise<IProject> {
    const projectData = await this.projectModel.findById(id).exec();

    if (!projectData) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return projectData;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<IProject> {
    const existingProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return existingProject;
  }

  async remove(id: string): Promise<IProject> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();

    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.categoryModel.updateOne({ _id: deletedProject.category }, { $pull: { projects: id } });

    return deletedProject;
  }

  async findProjectsByCategory(categoryId: string): Promise<IProject[]> {
    const categoryExists = await this.categoryModel.exists({ _id: categoryId }).exec();

    if (!categoryExists) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const projects = await this.projectModel.find({ category: categoryId }).exec();

    if (!projects || projects.length === 0) {
      throw new NotFoundException(`No projects found for category with ID ${categoryId}`);
    }

    return projects;
  }


}
