import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from '../service/board.service';
import { JwtServiceAuthGuard } from 'src/auth/guard/jwt-service.guard';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { ApiOperation } from '@nestjs/swagger';
import { FindAllBoardsDto } from '../dtos/req.board.dto';

@Controller('api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시글 작성' })
  @UseGuards(JwtServiceAuthGuard)
  @Post()
  async createPost(@Body() data: CreateBoardDto, @Req() req) {
    const userId = req.user.id;
    return await this.boardService.createBoard(data, userId);
  }

  @ApiOperation({ summary: '게시글 자세히 보기' })
  @Get('/:id')
  async findPost(@Param('id') id: number) {
    return await this.boardService.findBoard(id);
  }

  @ApiOperation({ summary: '게시글 전체 불러오기..' })
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAllPost(@Req() data: FindAllBoardsDto) {
    return await this.boardService.findAllBoard();
  }
}
