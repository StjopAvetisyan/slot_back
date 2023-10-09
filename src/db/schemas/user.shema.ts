import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  uid: string;

  @Prop()
  current_points: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
