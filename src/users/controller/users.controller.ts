import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/common/dtos/user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users') // localhost:3000/users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보.' })
  @ApiResponse({ status: 200, description: 'SUCCESS', type: UserDto })
  @Get()
  getUsers(@User() user) {
    return user;
  }
}
