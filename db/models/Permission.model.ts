import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}