import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './entities/project.entity';
import { categorySchema } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'projects', schema: ProjectSchema }
    ]),MongooseModule.forFeature([{name: 'categories',schema:categorySchema}])
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
