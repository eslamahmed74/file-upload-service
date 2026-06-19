import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaPayloadDto } from './kafka-payloud.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  // fire and forget
  async emit<T>(topic: string, payload: KafkaPayloadDto<T>): Promise<void> {
    this.kafkaClient.emit(topic, payload);
  }

  // send the message and wait for kafka to reponse
  async send<T, R = any>(
    topic: string,
    payload: KafkaPayloadDto<T>,
  ): Promise<R> {
    return lastValueFrom(
      this.kafkaClient.send(topic, {
        key: payload.key,
        value: payload.value,
      }),
    );
  }
}
