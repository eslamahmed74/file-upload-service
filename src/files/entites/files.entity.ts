import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fileKey!: string;

  @Column({ type: 'varchar', default: '' })
  filePath!: string;

  @Column({ type: 'varchar', default: '' })
  status!: string;

  @CreateDateColumn()
  createdAt!: string;
}
