import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AdminDocument = HydratedDocument<Admin>

@Schema()
export class Admin{
    role:string
}
export const adminsSchema = SchemaFactory.createForClass(Admin)
