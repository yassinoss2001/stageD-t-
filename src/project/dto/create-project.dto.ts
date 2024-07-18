import { Prop } from '@nestjs/mongoose';
import { IsString, IsNotEmpty } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  etat: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsString()
  @IsNotEmpty()
  file: string;

  
  @IsString()
  @IsNotEmpty()
  category: string;

  @Prop([{type:SchemaTypes.ObjectId,ref:'tasks'}])
  tasks:Types.ObjectId[]
}
