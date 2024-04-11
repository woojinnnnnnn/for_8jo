import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Nest 의 미들웨어 로 사용, 요청을 처리 하기 전에 실행.
// passport 의 가드를 확장해 local-service 전략을 사용해 로그인 인증 수행.

@Injectable()
export class LocalServiceAuthGuard extends AuthGuard('local-service') {}
