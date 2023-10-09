import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { catchError, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UniversalResponse,
  UniversalResponseDTO,
  UniversalResponseStatus,
} from './universal-response.dto';
import { LogicalError } from '../index';

@Injectable()
export class UniversalResponseInterceptor<T>
  implements NestInterceptor<T, UniversalResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UniversalResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const response: UniversalResponse<T> = {
          status: UniversalResponseStatus.OK,
          error: null,
          data,
        };

        if (data instanceof UniversalResponseDTO) {
          return data as UniversalResponse<T>;
        }

        return response as UniversalResponse<T>;
      }),
      catchError((err) => {
        console.error(err);
        if (err instanceof LogicalError) {
          return of({
            status: UniversalResponseStatus.ERROR,
            data: null,
            error: err.format(),
          });
        }
        return throwError(err);
      }),
    );
  }
}
