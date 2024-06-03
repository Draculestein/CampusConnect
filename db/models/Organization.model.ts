import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User.model';
import { Program } from './Programs.model';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    // Search properties
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

    // Details
    @Column()
    ope8id: string;

    @Column()
    ope6id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    postalCode: string;

    @Column()
    url: string;

    @Column({type: 'double'})
    admissionRate: number;

    @Column()
    averageSAT: number;

    @Column()
    testScore: number;

    @Column()
    nonResidentAlienCount: number;

    @Column()
    averageCostAttendance: number;

    @Column()
    outOfStateTuition: number;

    @Column()
    booksAndSuppliesCost: number;

    @Column()
    onCampusExpense: number;

    @Column()
    offCampusExpense: number;

    @Column()
    withFamilyExpense: number;

    @Column()
    ratioUndergradFaculty: number;

    @Column()
    lowestTemp: number;

    @Column()
    highestTemp: number;

    @Column()
    usersEnrolledCount: number;

    @Column()
    usersTransferredOutCount: number;

    // Relations

    @OneToMany(() => User, (user) => user.organization)
    users: User[];

    @OneToMany(() => Program, (program) => program.organization)
    programs: Program[];
}