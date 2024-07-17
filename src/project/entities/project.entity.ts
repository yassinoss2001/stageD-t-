import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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


}
export const ProjectSchema = SchemaFactory.createForClass(Project)
