import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dtos/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { JwtServiceAuthGuard } from 'src/auth/guard/jwt-service.guard';
import { User } from 'src/common/decorators/user.decorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users') // localhost:3000/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보.' })
  @ApiResponse({ status: 200, description: 'SUCCESS', type: UserDto })
  @UseGuards(JwtServiceAuthGuard)
  @Get()
  getUsers(@User() user) {
    return user;
  }
}
