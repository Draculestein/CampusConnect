import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Organization {
    @PrimaryColumn()
    id: string;

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
    offCampusExprese: number;

    @Column()
    withFamilyExpense: number;

    @Column()
    ratioUndergradFaculty: number;

    @Column()
    lowesTemp: number;

    @Column()
    highestTemp: number;

    @Column()
    usersEnrolledCount: number;

    @Column()
    usersTransferredOutCount: number;
}