import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    example: '테스트 제목',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: '테스트 내용',
    description: '내용',
  })
  content: string;

  @ApiProperty({
    example: 'https:~~ || 빈 값 (null)',
    description: '이미지 URL',
  })
  image: string | null;
}
