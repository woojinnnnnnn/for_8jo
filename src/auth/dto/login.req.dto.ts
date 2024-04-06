import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/User';

export class LoginRequestDto extends PickType(User, [
  'email',
  'password',
] as const) {}
