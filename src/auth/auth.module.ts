import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { refreshTokenStrategy } from './strategies/refreshToken.stategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';

@Module({
  imports: [UsersModule,JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,refreshTokenStrategy,AccessTokenStrategy],
})
export class AuthModule {}
