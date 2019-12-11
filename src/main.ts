import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/all.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: Logger,
  });
 // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}

bootstrap();
