import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProjectModule } from './project/project.module';
import { TypesModule } from './types/types.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017", { dbName: "pfayassine" }),
    CategoriesModule,
    ProjectModule,
    TypesModule,
    PermissionsModule,
    TaskModule,
    UsersModule,
    AdminsModule,
    EmployeesModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({isGlobal:true})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
