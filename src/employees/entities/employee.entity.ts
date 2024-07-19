import { Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type EmployeeDocument = HydratedDocument<Employee>
@Schema()
export class Employee{
    role:string
}
export const employeesSchema = SchemaFactory.createForClass(Employee)
