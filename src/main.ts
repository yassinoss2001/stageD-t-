import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('PFA project')
  .setDescription('salaries')
.addTag("users")
.addTag("auth")
.addTag("projects")
.addTag("categories")
.addTag("permissions")
.addTag("task")
.addTag("types")
.addBearerAuth({
  type: 'http',
  scheme: 'bearer',
  name: 'Authorization', // Header name
  description: 'Enter JWT token', // Description
  in: 'header', // Location of the token in the request
})




  .build()

const document = SwaggerModule.createDocument(app , config)
SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
