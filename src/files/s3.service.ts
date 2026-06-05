import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private buketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION ,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_kEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_kEY || '',
      },
    });

    this.buketName = process.env.AWS_BUKET_NAME || "";
  }

  async createPresignedUrl (fileName:string,contentType:string):Promise<string>{
    const fileKey=`${Date.now()}-${fileName}`;

    console.log('file key '+ fileKey);

    const command=new PutObjectCommand({
        Bucket:this.buketName,
        Key:fileKey,
        ContentType:contentType
    });

    console.log('command '+ command)

    const expiresIn=900;

    return await getSignedUrl(this.s3Client,command,{expiresIn});
  }
}
