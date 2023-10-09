import { Injectable } from '@nestjs/common';
import { Config } from '../db/schemas/config.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GameProvider {
  constructor(@InjectModel(Config.name) private configModel: Model<Config>) {}

  async getConfig(): Promise<Config> {
    return this.configModel.findOne().lean();
  }

  async getConfigForUser(): Promise<Config> {
    return this.configModel
      .findOne()
      .select(
        'prizes.id prizes.figure prizes.prizes_count  possible_bets slot_count ',
      )
      .lean();
  }
}
