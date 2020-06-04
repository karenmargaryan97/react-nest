import * as fs from 'fs-extra';
import { join } from 'path';
import { cwd } from 'process';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app-module';
import { swaggerOptions } from './config/swagger';

(async () => {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  fs.ensureDirSync(join(cwd(), 'dist/openapi'));
  fs.writeJsonSync(
      join(cwd(), 'dist', 'openapi', 'api-doc.json'),
      document,
      { spaces: 2 },
  );

  process.exit(0);
})();