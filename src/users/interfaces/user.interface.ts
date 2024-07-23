export interface IUser extends Document{
    readonly _id:string
    readonly firstName:string
    readonly lastName:string
    readonly email:string
    readonly phone:string
    readonly adress:string
    readonly password:string
    readonly refreshToken: string;



}