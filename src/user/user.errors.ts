import { LogicalError } from '../common';

export class UserNotFoundError extends LogicalError {
  constructor() {
    super(10004, 'User not found. Please clean local storage');
  }
}
