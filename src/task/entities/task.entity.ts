import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Task {
    @Prop({required:true, unique:true})
    title: string;

    @Prop({required:true})
    description: string;

    @Prop({required:true})
    duration: string;

    @Prop({required:true})
    status: string;
   
    @Prop({type: SchemaTypes.ObjectId, ref:'projects', required:true})
    project: Types.ObjectId;

    @Prop({type: SchemaTypes.ObjectId, ref: 'users', required: true}) 
    user: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
