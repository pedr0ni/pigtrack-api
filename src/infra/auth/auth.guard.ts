import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {decode} from 'jsonwebtoken';
import {Observable} from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request.headers.authorization);
    const user = decode(token);

    request.user = user;
    return super.canActivate(context);
  }

  private extractToken(authorizationHeader: string | undefined): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Missing jwt token');
    }

    const tokenPrefix = 'Bearer ';
    if (authorizationHeader.startsWith(tokenPrefix)) {
      return authorizationHeader.slice(tokenPrefix.length);
    }

    return authorizationHeader;
  }
}
