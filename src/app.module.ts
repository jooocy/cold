import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { PrismaModule } from './core/db/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DearLinkJwtModule } from './common/jwt/dear-link.jwt.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleModule } from './feature/google/google.module';
import { QnaModule } from './feature/qna/qna.module';
import { OpenAiModule } from './feature/open-ai/open-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DearLinkJwtModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    GoogleModule,
    QnaModule,
    OpenAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
