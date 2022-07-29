import { Controller } from '@nestjs/common';
import { Post, UseGuards, Get, Request, Body, Req } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignupUserDto } from 'src/user/user.dto/signup-user.dto';
import { UserService } from 'src/user/user.service';

import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() SignupUserDto: SignupUserDto): Promise<any> {
    return await this.authService.signup(SignupUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  async test(@Req() req) {
    console.log('OK');
  }
}
