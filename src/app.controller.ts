import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { get } from 'http';
import { join } from 'path';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }


@Get('/file/:folder/:img')
readFile(@Param('folder')folder , @Param('img')img):StreamableFile{
  const file = createReadStream(
    join(process.cwd(),'/upload/'+folder+'/'+img)
  )
  return new StreamableFile(file)
}

}
