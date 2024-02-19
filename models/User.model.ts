import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Organization } from './Organization.model';
import { Role } from './Roles.model';

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

    @ManyToOne(() => Organization, (org) => org.users)
    organization: Organization;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}