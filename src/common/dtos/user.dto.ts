import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 1,
    description: '고유값',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 'testNick',
    description: 'NICK_NAME',
    required: true,
  })
  nickname: string;
}
