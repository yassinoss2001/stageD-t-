import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

 

@ApiProperty({
  type:String,
  description:"this is a required field"
})

  @IsString()
  @IsNotEmpty()
  firstName: string;


  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;


  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  phone: string;



  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  adress: string;

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
  @IsString()
  @IsNotEmpty()
  role: string;
  
}
