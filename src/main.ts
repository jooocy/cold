import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  // CORS 설정
  app.enableCors({
    origin: [
      'https://customwidgethosting.web.app',
      'https://ff-debug-service-frontend-pro-ygxkweukma-uc.a.run.app',
      'http://localhost:3000',  // 로컬 개발용
      'http://localhost:53265',
      'http://localhost:49468',
      'http://localhost:64400',
      'http://localhost:8080',
      'http://localhost',
      'http://127.0.0.1',
      'http://[::1]',
      // 필요한 다른 도메인들 추가
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
