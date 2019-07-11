import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
class JwtAuthGuardClass extends AuthGuard('jwt') {
  private allowGuest: boolean = false;

  constructor(options?: JwtAuthGuardOptions) {
    super();
    this.allowGuest = options && options.allowGuest ? true : false;
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err) {
      throw err;
    }

    // if allowGuest == true, pass request
    if (!user && this.allowGuest === false) {
      throw new UnauthorizedException();
    }
    return user || null;
  }
}

interface JwtAuthGuardOptions {
  allowGuest?: boolean;
}

export const JwtAuthGuard = (options?: JwtAuthGuardOptions) => {
  return new JwtAuthGuardClass(options);
};
