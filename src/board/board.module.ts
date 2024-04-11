import { Module } from '@nestjs/common';
import { BoardController } from './controller/board.controller';
import { BoardService } from './service/board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entities/Board';
import { User } from 'src/entities/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User]), JwtModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
