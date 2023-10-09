import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Config extends Document {
  @Prop()
  prizes: Prize[];

  @Prop()
  possible_bets: number[];

  @Prop()
  slot_count: number;
}

export interface Prize {
  id: number;
  figure: string;
  prizes_count: number;
  chance: number;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
