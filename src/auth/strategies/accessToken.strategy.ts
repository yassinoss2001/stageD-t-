import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy , 'jwt'){
constructor(){
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:process.env.JWT_ACCESS_TOKEN
})

}
validate(payload:JwtPayload){
    return payload
}
}