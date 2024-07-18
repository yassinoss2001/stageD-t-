import { IsString ,IsNotEmpty} from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    reason:string

    @IsString()
    @IsNotEmpty()
    dateDeb:string

    @IsString()
    @IsNotEmpty()
    dateFin:string

    @IsString()
    @IsNotEmpty()
    status:string

    @IsString()
    @IsNotEmpty()
    type: string;
  static type: any;
}
