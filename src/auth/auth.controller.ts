import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() createLoginDto: CreateLoginDto, @Res() response) {
    try {
      const result = await this.authService.signIn(createLoginDto);
      return response.status(HttpStatus.OK).json({
        message: 'Sign-in successful',
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
