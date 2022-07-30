import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema/message.schema';
import { Model } from 'mongoose';
@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
  ) {}
  async createMessage(payload: any) {
    return await (
      await this.MessageModel.create({ ...payload })
    ).populate({
      path: 'user',
    });
  }
  async getMessageInRoom(RoomId: any) {
    const message = await this.MessageModel.find({ room: RoomId })
      .populate({
        path: 'user',
      })
      .sort({ createdAt: 1 });
    return message;
  }
}
