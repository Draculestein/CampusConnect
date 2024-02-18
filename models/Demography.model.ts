import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Demography {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    race: string;

    @Column()
    count: number;
}