import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryColumn()
    userID: number;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column('date')
    dob: Date;

    @Column()
    graduationDate: Date;

    @Column()
    nationality: string;

    @Column()
    race: string;
}