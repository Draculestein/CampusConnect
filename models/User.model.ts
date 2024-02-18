import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column('date')
    dob: Date;

    @Column('date')
    graduationDate: Date;

    @Column()
    nationality: string;

    @Column()
    race: string;
}