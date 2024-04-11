import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignUpRequestDto } from '../dto/signup.req.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LocalServiceAuthGuard } from '../guard/local-service.guard';
import { LoginUserDto } from '../dto/req.login.dto';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('AUTH')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원 가입. ---------------------------------------------------------------
  @ApiOperation({ summary: '회원 가입.' })
  @Post('signUp')
  async createUser(@Body() data: SignUpRequestDto) {
    return await this.authService.createUser(data);
  }
  // 로그인. ---------------------------------------------------------------
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalServiceAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @Post('signIn')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUser(@Req() req, @Body() loginUserDto: LoginUserDto) {
    const token = this.authService.loginServiceUser(req.user);
    return token;
  }

  // 로그아웃. ---------------------------------------------------------------
  @ApiOperation({ summary: '로그아웃.' })
  @Post('signOut')
  logOut(@User() user) {
    return user;
  }
}
