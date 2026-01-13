import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// configuraçoes do servidor.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ajuste para horario do brasil
  process.env.TZ = '-03:00';

  // adiciona validação em toda entrada de dados
  app.useGlobalPipes(new ValidationPipe());

  // limita ou libera acesso aos serviços da minha api/backend
  app.enableCors();

  // abertura de portas para receber dados.
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
