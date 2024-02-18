import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Program {
    @PrimaryColumn()
    ope6id: string;

    @Column()
    cipCode: string;

    @Column()
    programName: string;

    @Column()
    programDescription: string;
}