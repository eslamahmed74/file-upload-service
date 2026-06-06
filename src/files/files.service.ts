import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './entites/files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {

    constructor(@InjectRepository(Files) private fileRepo:Repository<Files>){}

    async saveFile(fileKey:string):Promise<Files>{
        
        const newFile=await this.fileRepo.create({fileKey});
        
        return await this.fileRepo.save(newFile);
    }
}
