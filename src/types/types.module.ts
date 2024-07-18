import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { typeSchema } from './entities/type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'types', schema: typeSchema }
    ]),
  ],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
