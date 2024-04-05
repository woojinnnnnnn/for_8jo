import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './common/utils/winston.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  const port = process.env.PORT;
  // ------------------------------------------- 요청 성공 리스폰스.
  app.useGlobalInterceptors(new SuccessInterceptor());
  // ------------------------------------------- 밸리데이션.
  app.useGlobalPipes(new ValidationPipe());
  // ------------------------------------------- 에러 전문 필터.
  app.useGlobalFilters(new HttpExceptionFilter());
  // ---------------------------------- 스웨거.
  const config = new DocumentBuilder()
    .setTitle('연습겸 다듬기.')
    .setDescription('예 뭐..')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS 설정 --------------------------- .
  app.enableCors({
    origin: true, // 개발시 트루. 배포시에 localhost:3000 이런 느낌.
    credentials: true,
  });
  // ------------------------------------------- Passport
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);
  console.log(`---------- SERVER_START_ON_PORT ${port} ----------`);
}
bootstrap();
