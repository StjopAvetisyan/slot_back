import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from '../game.service';
import { GameProvider } from '../game.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from '../../db/schemas/config.shema';
import { GameModule } from '../game.module';
import { ConfigModule } from '@nestjs/config';
import GlobalConfig from '../../configs/global.config';

describe('getRandomFigure', () => {
  let service: GameService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GameModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.development`,
          load: [GlobalConfig],
        }),
        MongooseModule.forRoot(`mongodb://localhost:6060`, {
          dbName: 'slot',
        }),
        MongooseModule.forFeature([
          { name: Config.name, schema: ConfigSchema },
        ]),
      ],
      providers: [GameService, GameProvider],
    }).compile();

    service = module.get<GameService>(GameService);
  });
  describe('getRandomFigure', () => {
    it('should distribute figures according to chances', () => {
      const figures = [
        { figure: '🔔', chance: 10 },
        { figure: '❤️', chance: 15 },
        { figure: '💎', chance: 75 },
      ];
      const totalIterations = 10000;
      const tolerance = 2; // 2% tolerance for variation

      const count = {
        '🔔': 0,
        '❤️': 0,
        '💎': 0,
      };

      for (let i = 0; i < totalIterations; i++) {
        const result = service.getRandomFigure(figures);
        count[result]++;
      }

      const expectedChances = {
        '🔔': 10,
        '❤️': 15,
        '💎': 75,
      };

      Object.keys(count).forEach((figure) => {
        const actualChance = (count[figure] / totalIterations) * 100;
        const expectedChance = expectedChances[figure];

        expect(actualChance).toBeCloseTo(expectedChance, tolerance);
      });
    });
  });
});
