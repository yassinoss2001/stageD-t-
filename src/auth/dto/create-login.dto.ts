import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateLoginDto{
    @ApiProperty({
        type:String,
        description:"this is a required field"
      })
      @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        type:String,
        description:"this is a required field"
      })
      @IsString()
    @IsNotEmpty()
    password:string

}