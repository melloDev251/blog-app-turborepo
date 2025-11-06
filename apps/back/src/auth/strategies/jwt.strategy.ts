import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth.jwtPayload';
import { ConfigService } from '@nestjs/config';
// import { Strategy, ExtractJwt } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    const userid = payload.sub;
    return this.authService.validateJwtUser(userid);
  }
}
