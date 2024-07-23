import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { refreshTokenGuard } from 'src/guard/refreshToken.guard';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';



@Controller('auth')
@ApiTags("auth")

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createLoginDto:CreateLoginDto){
    return this.authService.signIn(createLoginDto)
  }


@UseGuards(refreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req()req:Request){
    const userId=req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId,refreshToken)
  }

  }

