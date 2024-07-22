import { ApiProperty } from "@nestjs/swagger";
import { IsString ,IsNotEmpty} from "class-validator";

export class CreatePermissionDto {

  @ApiProperty({
    type:String,
    description:"this is a required field"
  })
    @IsString()
    @IsNotEmpty()
    reason:string


@ApiProperty({
  type:String,
  description:"this is a required field"
})
    @IsString()
    @IsNotEmpty()
    dateDeb:string

@ApiProperty({
  type:String,
  description:"this is a required field"
})
    @IsString()
    @IsNotEmpty()
    dateFin:string


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
    type: string;
  static type: any;
}
