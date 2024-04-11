import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('BOARD')
export class Board {
  @ApiProperty({
    example: 1,
    description: '고유 아이디.',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: '제목 내용.',
    description: '제목 내용 입니다.',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({
    example: '게시글의 내용.',
    description: '게시글의 내용 부분 입니다.',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar' })
  content: string;

  @ApiProperty({
    example: 'htttps://~~~',
    description: '이미지 URL 입니다.',
  })
  @Column({ type: 'varchar' })
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | null;

  @OneToMany(() => Comment, (comment) => comment.board)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.board)
  like: Like[];

  @ManyToOne(() => User, (user) => user.board, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
