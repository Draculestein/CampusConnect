import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './User.model';

@Entity()
export class Role{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}