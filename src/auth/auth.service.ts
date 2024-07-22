import { BadRequestException, Injectable } from '@nestjs/common';
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
    return { user, tokens };
  }

  // Function to generate tokens
  async generateTokens(userId: string, email: string) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
          expiresIn: '10m'
        }
      )
    ]);

    return { accessToken };
  }
}
