import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';

export class CreateProjectDto {

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

@ApiProperty({
  type:String,
  description:"this is a required field"
})
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  etat: string;

@ApiProperty({
  type:String,
  description:"this is a required field"
})
  @IsString()
  @IsNotEmpty()
  duration: string;

@ApiProperty({
  type:String,
  description:"this is a required field"
})
  @IsString()
  @IsNotEmpty()
  file: string;

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @Prop([{type:SchemaTypes.ObjectId,ref:'tasks'}])
  tasks:Types.ObjectId[]
}
