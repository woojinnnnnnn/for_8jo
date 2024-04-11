import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service';

// 패스포트 로컬 전략, 로그인시 사용되는 기본 프로퍼티는 username, password 로 정의가 되어 있음.
// 이를 해결 하기 위해 super 안에 커스텀 코드 작성.
@Injectable()
export class LocalServiceStrategy extends PassportStrategy(
  Strategy,
  'local-service',
) {
  constructor(private authService: AuthService) {
    super({
      // 여기서 프로퍼티 변경.
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // 함수명은 꼭 validate 이게 아니면 에러 발생.
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateServiceUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
