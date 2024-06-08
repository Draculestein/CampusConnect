import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Application {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phoneCountryCode: string;

    @Column()
    phoneNumber: string;

    @Column()
    gender: string;

    @Column()
    dob: Date;

    @Column()
    race: string;

    @Column()
    country: string;

    @Column()
    province: string;

    @Column()
    city: string;

    @Column()
    address: string;

    @Column()
    zip: string;

    @Column()
    englishProficiencyReportPath: string;

    @Column()
    schoolName: string;

    @Column()
    schoolAddress: string;

    @Column()
    educationLevel: string;

    @Column()
    schoolCity: string;

    @Column()
    schoolReportPath: string;

    @Column()
    schoolProvince: string;

    @Column()
    schoolZip: string;

    @Column()
    fatherName: string;

    @Column()
    motherName: string;

    @Column()
    emergencyEmail: string;

    @Column()
    emergencyCountryCode: string;

    @Column()
    emergencyPhoneNumber: string;
};