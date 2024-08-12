import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = context.switchToHttp().getRequest();
    console.log('================================');
    console.log(`${method} ${url}`);
    console.log(`Start request in ${context.getClass().name}`);

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log(`Request ended in: ${Date.now() - start}ms`);
        console.log('================================');
      }),
    );
  }
}
