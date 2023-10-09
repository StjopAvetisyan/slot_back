import { Injectable } from '@nestjs/common';
import { GameProvider } from './game.provider';
import { ConfigResDto } from './dto/config.res.dto';
import { Config, Prize } from '../db/schemas/config.shema';
import { UserService } from '../user/user.service';
import { BetCountNotSupported, InsufficientPoints } from './game.errors';

@Injectable()
export class GameService {
  constructor(
    private readonly gameProvider: GameProvider,
    private readonly userService: UserService,
  ) {}

  config: any;

  async getConfig(): Promise<Config> {
    if (!this.config) {
      this.config = await this.gameProvider.getConfig();
    }
    return this.config;
  }

  async getRandomFigure() {
    const config = await this.getConfig();
    const randomNumber = Math.random() * 100;
    const sorted = config.prizes.sort((a, b) => b.chance - a.chance);
    let cumulativeChance = 0;

    for (const figure of sorted) {
      cumulativeChance += figure.chance;
      if (randomNumber <= cumulativeChance) {
        return figure;
      }
    }

    return config.prizes[config.prizes.length - 1];
  }

  async getConfigForUser(): Promise<ConfigResDto> {
    return await this.gameProvider.getConfigForUser();
  }

  async calculateWin(
    dropped_figures: Prize[],
    bet_count: number,
    current_points: number,
  ) {
    let win = false;
    let prize = bet_count * -1;
    if (this.areAllElementsSame(dropped_figures)) {
      win = true;
      const config = await this.getConfig();
      const win_amount =
        config.prizes.find((el) => el.id === dropped_figures[0].id)
          ?.prizes_count || 1;
      prize = win_amount * bet_count;
    }

    return {
      win,
      current_points: current_points + prize,
      prize: prize,
    };
  }

  areAllElementsSame(arr: Prize[]) {
    return arr.every((element) => element.figure === arr[0].figure);
  }

  async spin(bet_count: number, uid: string) {
    const config = await this.getConfig();
    if (!config.possible_bets.includes(bet_count)) {
      throw new BetCountNotSupported();
    }

    const user = await this.userService.getUser(uid);
    if (user.current_points <= 0) {
      throw new InsufficientPoints();
    }
    const dropped_figures = [];
    for (let i = 0; i < config.slot_count; i++) {
      dropped_figures.push(await this.getRandomFigure());
    }
    const does_win = await this.calculateWin(
      dropped_figures,
      bet_count,
      user.current_points,
    );

    this.userService.updateCurrenPoints(uid, does_win.current_points);
    return {
      positions: dropped_figures.map((el: Prize) => el.id),
      win: does_win.win,
      prize: does_win.prize,
      current_points: does_win.current_points,
    };
  }
}
