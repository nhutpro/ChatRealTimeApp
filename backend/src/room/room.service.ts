import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from './room.schema/room.schema';
@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<RoomDocument>, // private AuthService: AuthService,
  ) {}

  async createRoom(userList: any) {
    for (let i = 0; i < userList.lenth; i++) {
      userList[i] = new Types.ObjectId(userList[i]);
    }
    console.log(userList);
    return await this.RoomModel.create({
      users: userList,
    });
  }
  async getRoom(userId: any) {
    const room = await this.RoomModel.findOne({}).populate({ path: 'users' });
    console.log(room);
  }
}
