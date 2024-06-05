import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // Configurações do Swagger
  const config = new DocumentBuilder()
    .setTitle('Beach Tennis Student Management API')
    .setDescription('API para gerenciar alunos de beach tennis')
    .setVersion('1.0')
    .addOAuth2(
      {
        type: 'oauth2',
        flows: {
          password: {
            tokenUrl: '/api/v1/oauth2/login',
            scopes: {},
          },
        },
      },
      'Authentication',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: 'http://localhost:3000/api/oauth2-redirect.html',
      persistAuthorization: true,
      initOAuth: {
        clientSecret: 'secretKey',
        appName: 'Beach Tennis Student Management API',
      },
    },
  });

  // Adicionar ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: 422,
    }),
  );

  // Configuração do serviço de configuração
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  // Iniciar aplicação
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`View the API Documentation at: http://localhost:${PORT}/docs`);
}

bootstrap();
