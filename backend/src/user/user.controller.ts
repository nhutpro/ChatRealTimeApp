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

  // @UseGuards(JwtAuthGuard)
  @Get('find')
  async findUsername(@Req() req: any) {
    return await this.userService.findUserByUsername(req.query.username);
  }
}
