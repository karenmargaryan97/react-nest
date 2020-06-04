import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app-module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation-pipe';
import { HttpExceptionFilter } from './exceptions/filter/exception-filter';
import { Exception } from './exceptions/base-exception';
import { swaggerOptions } from './config/swagger';
import { DatabaseService } from './modules/database/database-service';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter<Exception>());

  const databaseService = await app.get<DatabaseService>(DatabaseService);
  await databaseService.executePendingMigrations();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(process.env.PORT || 8080);
})();
