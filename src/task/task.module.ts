import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './entities/task.entity';
import { ProjectSchema } from 'src/project/entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'tasks', schema: TaskSchema },
      { name: 'projects', schema: ProjectSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
