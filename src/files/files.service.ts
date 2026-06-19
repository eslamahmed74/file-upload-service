import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './entites/files.entity';
import { Repository } from 'typeorm';
import { KafkaService } from 'src/kafka/kafka.service';
import { UploadedFileDto } from './uploaded-file.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files) private fileRepo: Repository<Files>,
    private kafkaService: KafkaService,
  ) {}

  async saveFile(fileKey: string) {
    const newFile = await this.fileRepo.create({ fileKey });

    await this.fileRepo.save(newFile);
    const filePayload: UploadedFileDto = {
      fileKey,
      filePath: '',
    };

    await this.kafkaService.emit<UploadedFileDto>('file-uploaded', {
      key: 'file-uploaded',
      value: filePayload,
    });

    console.log('event emited');

    return;
  }
}
