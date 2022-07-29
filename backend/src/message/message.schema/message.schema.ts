import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as Type } from 'mongoose';
import { Room } from 'src/room/room.schema/room.schema';
import { User } from 'src/user/user.schema/user.schema';

export type MessageDocument = Message & Document;
@Schema({
  collection: 'message',
  timestamps: true,
  autoIndex: true,
})
export class Message {
  //   @Prop({ type: [Type.Types.ObjectId], ref: 'User' })
  @Prop({ type: Type.Types.ObjectId, ref: 'Room' })
  room: Room;

  @Prop({ type: Type.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  message: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
