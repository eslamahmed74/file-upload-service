import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Files{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fileKey!:string; 

    @CreateDateColumn()
    createdAt!:string;

}