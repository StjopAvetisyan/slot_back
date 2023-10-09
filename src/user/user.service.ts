import { Inject, Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/user.res.dto';
import { UserProvider } from './user.provider';
import { UserNotFoundError } from './user.errors';
import { v4 as uuidv4 } from 'uuid';
import { ConfigType } from '@nestjs/config';
import GlobalConfig from '../configs/global.config';

@Injectable()
export class UserService {
  constructor(
    @Inject(GlobalConfig.KEY)
    private globalConfig: ConfigType<typeof GlobalConfig>,
    private readonly userProvider: UserProvider,
  ) {}

  async updateCurrenPoints(uid: string, curren_points: number) {
    return await this.userProvider.updateCurrenPoints(uid, curren_points);
  }

  async getUser(uid: string): Promise<UserResponseDto> {
    try {
      if (!uid) {
        return this.generateUser();
      }
      return this.userProvider.findOneByFilter({ uid });
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return this.generateUser();
      }
    }
  }

  private async generateUser(): Promise<UserResponseDto> {
    return this.userProvider.createUser(
      uuidv4(),
      this.globalConfig.default_points,
    );
  }
}
