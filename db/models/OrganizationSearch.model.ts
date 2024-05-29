import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Organization } from './Organization.model';

@Entity()
export class OrganizationSearch {
    @PrimaryColumn()
    @OneToOne(() => Organization)
    @JoinColumn()
    id: number;

    @Column()
    numOfYears: number;

    @Column()
    cityType: string;

    @Column()
    climate: string;

    @Column()
    isPublic: boolean;

    @Column()
    country: string;
};