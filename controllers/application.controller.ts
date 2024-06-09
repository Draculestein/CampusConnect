import { IUserApplication } from '../types/Application';
import logger from '../config/logger';
import { UserRepository } from '../db/repositories/User.repositories';
import { OrganizationRepository } from '../db/repositories/Organization.repositories';
import { Application } from '../db/models/Application.model';
import { ApplicationRepository } from '../db/repositories/Application.repositories';

export async function applyUserToOrganization(userID: number, orgUrl: string, applicationObj: IUserApplication): Promise<[boolean, any]> {
    try {
        const user = await UserRepository.findOne({ where: { id: userID } });
        const organization = await OrganizationRepository.findOne({ where: { url: orgUrl } });

        if (!user) return [false, { message: 'User not found!' }];
        if (!organization) return [false, { message: 'Organization not found!' }];

        const application = new Application();
        application.user = user;
        application.organization = organization;
        application.firstName = applicationObj.firstName;
        application.lastName = applicationObj.lastName;
        application.email = applicationObj.email;
        application.phoneCountryCode = applicationObj.phoneCountryCode;
        application.phoneNumber = applicationObj.phoneNumber;
        application.gender = applicationObj.sex;
        application.dob = new Date(applicationObj.birthday);
        application.race = applicationObj.race;
        application.country = applicationObj.countryRegion;
        application.province = applicationObj.province;
        application.city = applicationObj.city;
        application.address = applicationObj.address;
        application.zip = applicationObj.zipCode;
        application.englishProficiencyReportPath = '/englishReport';
        application.schoolName = applicationObj.schoolName;
        application.schoolAddress = applicationObj.schoolAddress;
        application.educationLevel = applicationObj.education;
        application.schoolCity = applicationObj.schoolCity;
        application.schoolReportPath = '/schoolReportPath';
        application.schoolProvince = applicationObj.schoolProvince;
        application.schoolZip = applicationObj.schoolZipCode;
        application.fatherName = applicationObj.fatherName;
        application.motherName = applicationObj.motherName;
        application.emergencyEmail = applicationObj.emergencyEmail;
        application.emergencyCountryCode = applicationObj.emergencyPhoneCountryCode;
        application.emergencyPhoneNumber = applicationObj.emergencyPhoneNumber;

        await ApplicationRepository.save(application);

        return [true, null];
    } catch (error) {
        logger.error(error);
        return [false, error];
    };
}