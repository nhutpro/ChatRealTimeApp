import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignupUserDto } from './user.dto/signup-user.dto';
import { UserI } from './user.schema/user.interface';
import { LoginUserDto } from './user.dto/login-user.dto';
// import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>, // private AuthService: AuthService,
  ) {}
  private async isExist(username: string, email: string): Promise<boolean> {
    const user = await this.UserModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    console.log(user);
    if (user) {
      return true;
    } else return false;
  }
  // async login(user: UserI): Promise<any> {
  //   try {
  //     const foundeduser: UserI = await this.findOneByEmail(user.email);
  //     // console.log(foundeduser);
  //     if (foundeduser) {
  //       const isMatch: boolean = await this.AuthService.comparePassword(
  //         user.password,
  //         foundeduser.password,
  //       );
  //       // console.log(isMatch);
  //       if (isMatch) {
  //         const { password, ...others } = foundeduser._doc;
  //         console.log(process.env.JWT_SECRET);
  //         const accessToken = this.AuthService.signJWT({ ...others });
  //         // console.log(others, accessToken);
  //         return {
  //           ...others,
  //           accessToken: accessToken,
  //         };
  //       } else {
  //         throw new HttpException(
  //           'Login was not successfull, password is incorrect',
  //           HttpStatus.UNAUTHORIZED,
  //         );
  //       }
  //     } else {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  // }
  async create(user: any): Promise<any> {
    const isExist = await this.isExist(user.username, user.password);
    console.log('isExist', isExist);
    if (isExist) {
      return null;
    } else {
      const newUser = await this.UserModel.create(user);
      return newUser;
    }
  }

  signupUserDtoToEntity(SignupUserDto: SignupUserDto): UserI {
    return {
      email: SignupUserDto.email,
      username: SignupUserDto.username,
      password: SignupUserDto.password,
    };
  }
  // loginUserDtoToEntity(LoginUserDto: LoginUserDto): UserI {
  //   return {
  //     email: LoginUserDto.email,
  //     password: LoginUserDto.password,
  //   };
  // }
  // async findOneByEmail(email: string): Promise<UserI> {
  //   return await this.UserModel.findOne({ email: email });
  // }
  async findOne(username: string): Promise<any> {
    return await this.UserModel.findOne({ username: username });
  }
}
