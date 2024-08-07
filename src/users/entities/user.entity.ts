import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Admin } from "src/admins/entities/admin.entity";
import { Employee } from "src/employees/entities/employee.entity";
import * as argon2 from 'argon2';
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class User {
  @Prop({ required: true, type: String, enum: [Admin.name, Employee.name] })
  role: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop([{type:SchemaTypes.ObjectId,ref:"tasks"}]) 
  tasks: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User).pre('save', async function () {
  this.password = await argon2.hash(this.password);
});
