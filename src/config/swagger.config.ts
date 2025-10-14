import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Build force')
    .setDescription('API for buildforce backend')
    .setVersion('1.0')
    .addTag('buildforce')
    .addTag('Auth')
    .addTag('User')
    .addTag('Labour Profiles')
    .addTag('Company Profiles')
    .addTag('Admin Profiles')
    .addTag('Interview')
    .addTag('Projects')
    .addTag('Jobs')
    .addTag('Job Applications')
    .addBearerAuth()

    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);
}
