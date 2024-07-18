import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { permissionSchema } from './entities/permission.entity';
import { typeSchema } from 'src/types/entities/type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'permissions', schema: permissionSchema }
    ]),MongooseModule.forFeature([{name: 'types',schema:typeSchema}])
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
