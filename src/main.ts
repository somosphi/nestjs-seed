import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http.exception.filter';
import { AllExceptionsFilter } from './shared/all.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: Logger,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}

bootstrap();
