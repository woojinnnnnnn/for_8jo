import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDto } from '../dto/signup.req.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from '../dto/login.req.dto';

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

  // 임시. ---------------------------------------------------------------
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'password'],
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithOutPassword } = user;
      return userWithOutPassword;
    }
    return null;
  }

  // 로그인 한번 더 .
  async login(data: LoginRequestDto) {
    const { email, password } = data;
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인');
    }
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호 불 일치');
    }
    const payload = {
      email: email,
      sub: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
