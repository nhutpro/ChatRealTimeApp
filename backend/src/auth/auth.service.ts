import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  async comparePassword(password: string, storedPassword): Promise<boolean> {
    return await bcrypt.compare(password, storedPassword);
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    const isMatch: boolean = await this.comparePassword(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user._doc;
      return result;
    }
    return null;
  }
  login(user: any): any {
    const accessToken = this.signJWT(user);
    return {
      ...user,
      accessToken,
    };
  }
  async signup(user: any): Promise<any> {
    const hashedPassword: string = await this.hashPassword(user.password);
    user.password = hashedPassword;
    const newUser = await this.userService.create(user);
    console.log('newUser', newUser);
    if (newUser) {
      return {
        message: 'sign up successfully',
      };
    } else {
      throw new HttpException('User is Exist', HttpStatus.CONFLICT);
    }
  }
  signJWT(payload: any) {
    return this.jwtService.sign(payload);
  }
  async verifyJwt(jwt: string): Promise<any> {
    return await this.jwtService.verifyAsync(jwt);
  }
}
