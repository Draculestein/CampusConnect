import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated } from 'typeorm';
import { Organization } from './Organization.model';
import { Role } from './Roles.model';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string;

    @Column()
    email: string;

    @Column()
    password: string;

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

    @Column({
        type: 'text',
        nullable: true
    })
    nationality: string;

    @Column({
        type: 'text',
        nullable: true
    })
    race: string;

    @ManyToOne(() => Organization, (org) => org.users)
    organization: Organization | null;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;
}