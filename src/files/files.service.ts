import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './entites/files.entity';
import { Repository } from 'typeorm';
import { KafkaService } from 'src/kafka/kafka.service';
import { UploadedFileDto } from './uploaded-file.dto';
import { S3Service } from './s3.service';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files) private fileRepo: Repository<Files>,
    private kafkaService: KafkaService,
    private s3Service: S3Service,
  ) {}

  async saveFile(fileKey: string) {
    const downloadUrl = this.s3Service.getFileDownloadUrl(fileKey);
    const newFile = await this.fileRepo.create({
      fileKey,
      filePath: downloadUrl,
      status: 'PENDING_PROCESSING',
    });

    await this.fileRepo.save(newFile);
    const filePayload: UploadedFileDto = {
      fileKey,
      filePath: downloadUrl,
    };

    await this.kafkaService.emit<UploadedFileDto>('file-uploaded', {
      key: 'file-uploaded',
      value: filePayload,
    });

    console.log('event emited');

    return;
  }
}
