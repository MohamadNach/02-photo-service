import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerInfo = {
  api_path: '/docs',
  title: 'Photo service API',
  description: 'Demo API for NestJS feature with Photo service',
  version: '0.9',
  tag: '',
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const confige = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.description)
    .setVersion(swaggerInfo.version)
    .addTag(swaggerInfo.tag)
    .build();

  const document = SwaggerModule.createDocument(app, confige);
  SwaggerModule.setup(swaggerInfo.api_path, app, document);
  await app.listen(3000);
}
bootstrap();
