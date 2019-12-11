import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { CodedValidatorPipe } from './shared/coded-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: Logger,
  });
  app.useGlobalPipes(new CodedValidatorPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}

bootstrap();
