import { LogicalError } from '../common';

export class BetCountNotSupported extends LogicalError {
  constructor() {
    super(20004, 'No such number of bet');
  }
}

export class InsufficientPoints extends LogicalError {
  constructor() {
    super(20005, 'No more bets. Go home');
  }
}
