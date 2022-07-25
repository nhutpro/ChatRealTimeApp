import { Body, Controller, Get, Req, Res, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';
import { LoginUserDto } from './user.dto/login-user.dto';
import { SignupUserDto } from './user.dto/signup-user.dto';
import { UserService } from './user.service';
import { UserI } from './user.schema/user.interface';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('login')
  login(@Body() LoginUserDto: LoginUserDto) {
    console.log(LoginUserDto);
    const user: UserI = this.userService.loginUserDtoToEntity(LoginUserDto);
    return this.userService.login(user);
  }
  @Post('signup')
  signup(@Body() SignupUserDto: SignupUserDto): Promise<UserI> {
    const user: UserI = this.userService.signupUserDtoToEntity(SignupUserDto);
    return this.userService.signup(user);
  }
}
