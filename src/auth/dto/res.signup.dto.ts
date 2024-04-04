import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/User';

export class SignUpResponseDto extends PickType(User, [
  'email',
  'nickname',
] as const) {}
