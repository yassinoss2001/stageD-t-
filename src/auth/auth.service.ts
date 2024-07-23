import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateLoginDto } from './dto/create-login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signIn(createLoginDto: CreateLoginDto) {
    // Check if user exists
    const user = await this.usersService.findOneByEmail(createLoginDto.email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // Verify password
    const passwordMatches = await argon2.verify(user.password, createLoginDto.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.generateTokens(user._id, user.email);
    await this.updateRefreshToken(user._id , tokens.refreshToken);
    return { user, tokens };
  }

  // Function to generate tokens
  async generateTokens(userId: string, email: string) {
    const [accessToken,refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
          expiresIn: '10m'
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
          expiresIn: '1d'
        }
      )
    ]);

    return { accessToken, refreshToken};
  }

  async updateRefreshToken(userId:string , refreshToken:string){
    const hashedRefreshToken = await argon2.hash(refreshToken)
    await this.usersService.update(userId,{refreshToken:hashedRefreshToken})
  }

  async refreshTokens(userId:string,refreshToken:string){
    const user=await this.usersService.findOne(userId)
    if(!user || !user.refreshToken){
      throw new ForbiddenException('access denied')
    }
    const tokens = await this.generateTokens(user._id, user.email);
    await this.updateRefreshToken(user._id , tokens.refreshToken);
    return { user, tokens };
  }
}
