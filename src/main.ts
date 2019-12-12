import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CodedValidatorPipe } from './shared/coded-validation.pipe';
import { HttpExceptionFilter } from './shared/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CodedValidatorPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}

bootstrap();
