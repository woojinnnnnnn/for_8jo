import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { LocalServiceStrategy } from './strategy/local-service.strategy';
import { JwtServiceStrategy } from './strategy/jwt-service.strategy';
import { JwtServiceAuthGuard } from './guard/jwt-service.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          // JWT Token Create.
          secret: configService.get('SECRET_KEY'),
          // JWT expires
          signOptions: { expiresIn: '1y' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalServiceStrategy,
    JwtServiceStrategy,
    JwtServiceAuthGuard,
  ],
})
export class AuthModule {}
