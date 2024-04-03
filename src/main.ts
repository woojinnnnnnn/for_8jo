import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './common/utils/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  const port = process.env.PORT;
  await app.listen(port);
  console.log(`---------- SERVER_START_ON_PORT ${port} ----------`);
}
bootstrap();
