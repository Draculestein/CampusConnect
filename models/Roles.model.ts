import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity
export class Roles{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}