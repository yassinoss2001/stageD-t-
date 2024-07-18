import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  dateDeb: string;

  @Prop({ required: true })
  dateFin: string;

  @Prop({ required: true })
  status: string;

  @Prop({type:SchemaTypes.ObjectId,ref:'types',required:true})
  type: Types.ObjectId
}

export const permissionSchema = SchemaFactory.createForClass(Permission);
