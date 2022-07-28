import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Room, RoomDocument } from './room.schema/room.schema';
@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private RoomModel: Model<RoomDocument>, // private AuthService: AuthService,
  ) {}

  async createRoom(userList: any) {
    const dataList = [];
    for (let i = 0; i < userList.length; i++) {
      dataList[i] = new Types.ObjectId(userList[i]);
    }
    return await this.RoomModel.create({
      users: dataList,
    });
  }
  async getRoom(userId: any) {
    const room = await this.RoomModel.find({
      users: userId,
    }).populate({
      path: 'users',
      match: { _id: { $ne: userId } },
      select: ['_id', 'avatar', 'username'],
    });
    return room;
  }
}
