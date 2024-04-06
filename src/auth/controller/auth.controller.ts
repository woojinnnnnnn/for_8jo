import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpRequestDto } from '../dto/signup.req.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LocalAutGuard } from '../local.auth.guard';
import { LoginRequestDto } from '../dto/login.req.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원 가입. ---------------------------------------------------------------
  @ApiOperation({ summary: '회원 가입.' })
  @Post('sign-up')
  async createUser(@Body() data: SignUpRequestDto) {
    return await this.authService.createUser(data);
  }

  // 로그인. ---------------------------------------------------------------
  @ApiOperation({ summary: '로그인.' })
  @UseGuards(LocalAutGuard)
  @Post('sign-In')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.login(data);
  }

  // 로그아웃. ---------------------------------------------------------------
  @ApiOperation({ summary: '로그아웃.' })
  @Post('sign-Out')
  logOut(@User() user) {
    return user;
  }
}
