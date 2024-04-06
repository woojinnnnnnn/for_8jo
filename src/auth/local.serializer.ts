import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super();
  }
  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id); // 사용자 ID만 세션에 저장
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: +userId },
        select: ['id', 'email', 'nickname'],
      });
      done(null, user); // 사용자 객체를 복원하여 req.user에 저장
    } catch (error) {
      done(error); // 데이터베이스 조회 오류를 Passport에게 전달
    }
  }
}
