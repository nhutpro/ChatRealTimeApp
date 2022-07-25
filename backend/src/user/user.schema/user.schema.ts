import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({
  collection: 'user',
  timestamps: true,
  autoIndex: true,
})
export class User {
  @Prop()
  email: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
