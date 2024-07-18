import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Project {
    @Prop({required:true , unique:true})
    name : string
    @Prop({required:true })
    description:string
    @Prop({required:true })
    etat:string
    @Prop({required:true })
    duration:string
    @Prop({required:true })
    file:string

    @Prop({type:SchemaTypes.ObjectId,ref:'categories',required:true})
    category: Types.ObjectId

    @Prop([{type:SchemaTypes.ObjectId,ref:'tasks'}])
    tasks:Types.ObjectId[]


}
export const ProjectSchema = SchemaFactory.createForClass(Project)
