import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CodedValidatorPipe } from './shared/coded-validation.pipe';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CodedValidatorPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get<ConfigService>(ConfigService);
  if (!configService.envConfig.isProduction) {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(configService.envConfig.httpPort);
}

bootstrap();
