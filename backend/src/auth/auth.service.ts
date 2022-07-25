import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  async comparePassword(password: string, storedPassword): Promise<boolean> {
    return await bcrypt.compare(password, storedPassword);
  }
  signJWT(payload: any) {
    return this.jwtService.sign(payload);
  }
}
