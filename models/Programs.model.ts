import { Entity, PrimaryColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Organization } from './Organization.model';

@Entity()
export class Program {
    @PrimaryColumn()
    ope6id: string;

    @PrimaryColumn()
    cipCode: string;

    @Column()
    programName: string;

    @Column()
    programDescription: string;

    @ManyToOne(() => Organization, (org) => org.programs)
    organization: Organization;
}