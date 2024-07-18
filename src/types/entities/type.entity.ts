import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Type {
    @Prop({required:true , unique:true})
    name : string

    @Prop([{type:SchemaTypes.ObjectId,ref:'permissions'}])
    permissions:Types.ObjectId[]



}
export const typeSchema = SchemaFactory.createForClass(Type)
