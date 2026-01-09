import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { INestApplication } from '@nestjs/common';

const server = express();
let app: INestApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.useGlobalInterceptors(new ResponseInterceptor());
    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api');

    await app.init();
  }
  return server;
}

// Export for Vercel
export default async (req: any, res: any) => {
  const expressServer = await bootstrap();
  return expressServer(req, res);
};

// For local development
if (require.main === module) {
  const startLocal = async () => {
    const localApp = await NestFactory.create(AppModule);
    localApp.useGlobalInterceptors(new ResponseInterceptor());
    localApp.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
    localApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    localApp.setGlobalPrefix('api');
    await localApp.listen(process.env.PORT ?? 3001);
    console.log(`Application is running on: ${await localApp.getUrl()}`);
  };
  startLocal();
}
