import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 1,
    description: '고유값',
  })
  id: number;

  @ApiProperty({
    example: 'testNick',
    description: '닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: 'test123@gmail.com',
    description: '이메일',
  })
  email: string;
}
