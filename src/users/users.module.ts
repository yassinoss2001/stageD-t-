import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { Admin, adminsSchema } from 'src/admins/entities/admin.entity';
import { Employee, employeesSchema } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: userSchema , discriminators : [{name : Admin.name,schema:adminsSchema},{name:Employee.name,schema:employeesSchema}]}
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
