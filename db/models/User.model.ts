import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, OneToMany } from 'typeorm';
import { Organization } from './Organization.model';
import { Role } from './Roles.model';
import { Application } from './Application.model';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'text',
        nullable: true,
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column({
        type: 'date',
        nullable: true
    })
    graduationDate: Date | null;

    @ManyToOne(() => Organization, (org) => org.users)
    organization: Organization | null;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @OneToMany(() => Application, (application) => application.user)
    applications: Application[];
}