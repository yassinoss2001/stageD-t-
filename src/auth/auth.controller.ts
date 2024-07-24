import { Controller, Post, Body, Res, HttpStatus, Get, Req, UseGuards, Param, Put, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { refreshTokenGuard } from 'src/guard/refreshToken.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
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

@ApiBearerAuth('refresh-token')
@UseGuards(refreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req()req:Request){
    const userId=req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId,refreshToken)
  }


  @ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req:Request) {
    const userId = req.user['sub']
    return this.authService.logout(userId)
  }


  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Patch('update-profile/:id')
  async updateUserProfile(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto, @Res() response) {
    try {
      const result = await this.authService.updateUserProfile(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User profile updated successfully',
        status: HttpStatus.OK,
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

}