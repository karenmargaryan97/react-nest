import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('App')
  .setDescription('Nest.js/React.js app')
  .setVersion('0.1.0')
  .addTag('Api', 'Application purpose')
  .addTag('Nest.js', 'Framework')
  .build();
