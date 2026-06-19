import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class KafkaPayloadDto<T = any> {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsObject()
  @IsNotEmpty()
  value!: T;
}
