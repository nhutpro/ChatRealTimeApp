import {
  Body,
  Controller,
  Get,
  Req,
  Res,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { LoginUserDto } from './user.dto/login-user.dto';
import { SignupUserDto } from './user.dto/signup-user.dto';
import { UserService } from './user.service';
import { UserI } from './user.schema/user.interface';
import { getHeapCodeStatistics } from 'v8';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto) {
    // console.log(LoginUserDto);
    // const user: UserI = this.userService.loginUserDtoToEntity(LoginUserDto);
    // return this.userService.login(user);
  }
}
