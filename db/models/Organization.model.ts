import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User.model';
import { Program } from './Programs.model';
import { Application } from './Application.model';

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

    @Column({ unique: true })
    url: string;

    @Column({ unique: true })
    iconUrl: string;

    @Column({ unique: true })
    backgroundSearchUrl: string;

    // Details
    @Column({
        type: String,
        nullable: true
    })
    ope8id: string;

    @Column({
        type: String,
        nullable: true
    })
    ope6id: string;

    @Column({
        type: String,
        nullable: true
    })
    name: string;

    @Column({
        type: String,
        nullable: true
    })
    address: string;

    @Column({
        type: String,
        nullable: true
    })
    city: string;

    @Column({
        type: String,
        nullable: true
    })
    state: string;

    @Column({
        type: String,
        nullable: true
    })
    postalCode: string;

    @Column({
        type: String,
        nullable: true
    })
    website: string;

    @Column({
        type: 'double',
        nullable: true
    })
    admissionRate: number;

    @Column({
        nullable: true
    })
    averageSAT: number;

    @Column({
        nullable: true
    })
    testScore: number;

    @Column({
        nullable: true
    })
    nonResidentAlienCount: number;

    @Column({
        nullable: true
    })
    averageCostAttendance: number;

    @Column({
        nullable: true
    })
    outOfStateTuition: number;

    @Column({
        nullable: true
    })
    booksAndSuppliesCost: number;

    @Column({
        nullable: true
    })
    onCampusExpense: number;

    @Column({
        nullable: true
    })
    offCampusExpense: number;

    @Column({
        nullable: true
    })
    withFamilyExpense: number;

    @Column({
        nullable: true
    })
    ratioUndergradFaculty: number;

    @Column({
        nullable: true
    })
    lowestTemp: number;

    @Column({
        nullable: true
    })
    highestTemp: number;

    @Column({
        nullable: true
    })
    usersEnrolledCount: number;

    @Column({
        nullable: true
    })
    usersTransferredOutCount: number;

    // Relations

    @OneToMany(() => User, (user) => user.organization)
    users: User[];

    @OneToMany(() => Program, (program) => program.organization)
    programs: Program[];

    @OneToMany(() => Application, (application) => application.organization)
    applications: Application[];
}