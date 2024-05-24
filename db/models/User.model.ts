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
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: 'int',
        nullable: true
    })
    age: number | null;

    @Column({
        type: 'text',
        nullable: true
    })
    gender: string | null;

    @Column({
        type: 'date',
        nullable: true
    })
    dob: Date | null;

    @Column({
        type: 'date',
        nullable: true
    })
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