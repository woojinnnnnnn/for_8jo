import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDto } from '../dto/signup.req.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 회원 가입. ---------------------------------------------------------------
  async createUser(data: SignUpRequestDto) {
    const { email, nickname, password } = data;
    const isExist = await this.usersRepository.findOne({ where: { email } });
    if (isExist) {
      throw new UnauthorizedException('이미 존재하는 이메일.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
    delete newUser.password; // 리스폰스 값에 비밀 번호는 삭제.
    return newUser;
  }

  // 가입 유무 및 비밀번호 일치 확인. ---------------------------------------------------------------
  async validateServiceUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'nickname', 'password'],
    });
    if (!user) {
      throw new ForbiddenException('등로 되지 않은 사용자.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('비밀번호 일치 하지 않음오');
    }
    return user;
  }

  // 로그인. -----------------------------------------------------------------
  loginServiceUser(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
