import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// secretOrKey: 토큰 서명에 사용할 비밀키 지정.
// ignoreExpiration: 토큰의 만료 여부 검사.
// jwtFromRequest: 클라이언트로 부터 전송된 토큰을 추출.

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(
  Strategy,
  'jwt-service',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get('SECRET_KEY'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // JWT 에서 추출한 페이로드를 검증 하고 정보를 반환.
  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      nickname: payload.nickname,
      createdAt: payload.createdAt,
    };
  }
}
