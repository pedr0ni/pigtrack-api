/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {Observable, delay} from 'rxjs';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(delay(2000));
  }
}
