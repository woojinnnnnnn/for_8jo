import { Module } from '@nestjs/common';
import { LikeController } from './controller/like.controller';
import { LikeService } from './service/like.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
