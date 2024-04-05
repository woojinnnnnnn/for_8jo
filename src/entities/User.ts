import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './Board';
import { Comment } from './Comment';
import { Like } from './Like';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

@Entity('USER')
export class User {
  @ApiProperty({
    example: 1,
    description: '고유값',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: 'testNick',
    description: 'NICK_NAME',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  nickname: string;

  @ApiProperty({
    example: 'test123@gmail.com',
    description: 'EMAIL',
  })
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty({
    example: 'testPW@',
    description: 'PASSWORD',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', select: false })
  password: string;

  @ApiProperty({
    example: UserRole,
    description: '고유값',
  })
  @Column({ type: 'varchar', default: UserRole.CLIENT })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  hashedRefreshToken: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | null;

  // 1 : N ;
  @OneToMany(() => Board, (board) => board.user)
  board: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  like: Like[];

  readonly readOnlyData: {
    email: string;
    nickname: string;
  };
}
