import { Module, OnModuleInit } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameProvider } from './game.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from '../db/schemas/config.shema';
import { User, UserSchema } from '../db/schemas/user.shema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  providers: [GameService, GameProvider],
  controllers: [GameController],
})
export class GameModule implements OnModuleInit {
  constructor(private readonly gameService: GameService) {}

  onModuleInit(): any {
    this.gameService.getConfig();
  }
}
