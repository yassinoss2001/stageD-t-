import { ApiProperty } from "@nestjs/swagger";
import { IsString ,IsNotEmpty} from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        type:String,
        description:"this is a required field"
      })
    @IsString()
    @IsNotEmpty()
    name:string
}
