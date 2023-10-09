import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserNotFoundError } from './user.errors';
import { User } from '../db/schemas/user.shema';

@Injectable()
export class UserProvider {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(uid: string, current_points: number): Promise<User> {
    return this.userModel.create({ uid, current_points });
  }

  async updateCurrenPoints(uid: string, current_points: number): Promise<User> {
    return this.userModel.updateOne({ uid }, { current_points }).lean();
  }

  async findOneByFilter(filter: any): Promise<User> {
    const user = await this.userModel.findOne(filter).lean();
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
