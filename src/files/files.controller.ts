import { Body, Controller, Get, Post } from '@nestjs/common';
import { FilesService } from './files.service';
import { S3Service } from './s3.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly s3Service: S3Service,
  ) {}

  @Post('presigned-url')
  async getPresignedUrl(
    @Body('fileName') fileName: string,
    @Body('contentType') contentType: string,
  ) {
    const url = await this.s3Service.createPresignedUrl(fileName, contentType);

    return { url };
  }

  @Post('uploaded')
  async setUploadedSuccess(@Body('fileKey') fileKey: string) {
    await this.filesService.saveFile(fileKey);    
    return;
  }
}
