import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { User } from './entities/User';
import { Board } from './entities/Board';
import { Comment } from './entities/Comment';
import { Like } from './entities/Like';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Board, Comment, Like],
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
      migrationsRun: false, // 서버 구동시 마이그레이션 실행 ? false
      migrations: [__dirname + '/**/migrations/.ts,.js}'], // 마이스레이션 수행 파일 경로 설정.
      migrationsTableName: 'migrations', // 마이그레이션 이력 기록 되는 테이블이름.
    }),
    BoardModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [AppController], // 라우터.
  providers: [AppService],
})
export class AppModule {}
