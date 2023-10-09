import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import GlobalConfig from './configs/global.config';
import * as process from 'process';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ENV}`,
      load: [GlobalConfig],
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGODB_PORT}`,
      {
        dbName: process.env.MONGODB_DB_NAME,
      },
    ),
    UserModule,
    GameModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor() {}
}
