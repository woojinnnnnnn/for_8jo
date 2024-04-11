import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/Board';
import { Repository } from 'typeorm';
import { CreateBoardDto } from '../dtos/create-board.dto';
import { User } from 'src/entities/User';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 게시글 작성 -------------------------------------------------
  async createBoard(data: CreateBoardDto, userId: number) {
    const { title, content, image } = data;

    //     const user = await this.userRepository.findOne({ where: { id: userId } });
    const user = { id: userId };

    const createPost = this.boardRepository.save({
      title,
      content,
      image,
      user,
    });
    return createPost;
  }

  async findBoard(id: number) {
    return this.boardRepository.findOne({ where: { id } });
  }

  async findAllBoard() {
    return this.boardRepository.find();
  }
}
