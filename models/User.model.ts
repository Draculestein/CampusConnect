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
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column('date')
    dob: Date;

    @Column('date')
    graduationDate: Date | null;

    @Column()
    nationality: string | null;

    @Column()
    race: string | null;

    @ManyToOne(() => Organization, (org) => org.users)
    organization: Organization | null;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}