import { ApiProperty } from "@nestjs/swagger";
import { IsString ,IsNotEmpty} from "class-validator";

export class CreateTaskDto {

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
    @IsString()
    @IsNotEmpty()
    title:string

@ApiProperty({
  type:String,
  description:"this is a required field"
})
    @IsString()
    @IsNotEmpty()
    description:string

@ApiProperty({
  type:String,
  description:"this is a required field"
})
    @IsString()
    @IsNotEmpty()
    duration:string

@ApiProperty({
  type:String,
  description:"this is a required field"
})
    @IsString()
    @IsNotEmpty()
    status:string

@ApiProperty({
  type:String,
  description:"this is a required field"
})
    @IsString()
  @IsNotEmpty()
  project: string;
}
