import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as Type } from 'mongoose';
import { User } from 'src/user/user.schema/user.schema';
export type RoomDocument = Room & Document;
@Schema({
  collection: 'room',
  timestamps: true,
  autoIndex: true,
})
export class Room {
  //   @Prop({ type: [Type.Types.ObjectId], ref: 'User' })
  @Prop({ type: [{ type: Type.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ default: false })
  isSent: boolean;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
