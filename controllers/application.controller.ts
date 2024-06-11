import { IUserApplication } from '../types/Application';
import logger from '../logger/logger';
import { OrganizationRepository } from '../db/repositories/Organization.repositories';
import { Application } from '../db/models/Application.model';
import { ApplicationRepository } from '../db/repositories/Application.repositories';
import { uploadFile } from '../s3/s3';
import { User } from '../db/models/User.model';

export async function applyUserToOrganization(user: User, orgUrl: string, applicationObj: IUserApplication): Promise<[boolean, any]> {
    try {
        const organization = await OrganizationRepository.findOne({ where: { url: orgUrl } });

        if (!user) return [false, { message: 'User not found!' }];
        if (!organization) return [false, { message: 'Organization not found!' }];

        const englishProficiencyBase64 = applicationObj.englishProficiency.split(';base64,')[1];
        const schoolReportBase64 = applicationObj.schoolReport.split(';base64,')[1];

        const englishProficiencyBuffer = Buffer.from(englishProficiencyBase64, 'base64');
        const schoolReportBuffer = Buffer.from(schoolReportBase64, 'base64');

        const [englishProficiencySuccessful, englishProficiencyError] = await uploadFile(`${organization.id}/${user.uuid}/${applicationObj.englishProficiencyFileName}`, englishProficiencyBuffer);
        if(!englishProficiencySuccessful) return [false, englishProficiencyError];

        const [schoolReportSuccessful, schoolReportError] = await uploadFile(`${organization.id}/${user.uuid}/${applicationObj.schoolReportFileName}`, schoolReportBuffer);
        if(!schoolReportSuccessful) return [false, schoolReportError];

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