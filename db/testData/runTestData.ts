import * as argon2 from 'argon2';
import { OrganizationRepository } from '../repositories/Organization.repositories';
import { Organization } from '../models/Organization.model';
import { User } from '../models/User.model';
import { UserRepository } from '../repositories/User.repositories';

export async function runTestData() {
    const uOfU = new Organization();
    uOfU.numOfYears = 4;
    uOfU.cityType = 'mixed';
    uOfU.climate = 'cold';
    uOfU.isPublic = true;
    uOfU.country = 'United States';
    uOfU.url = 'uofu';
    uOfU.iconUrl = '/images/UofU.png';
    uOfU.backgroundSearchUrl = '/images/uofubuilding.jpeg';
    uOfU.name = 'Test Name 3';

    await OrganizationRepository.save(uOfU);

    const testUser = new User();
    testUser.email = 'test@gmail.com';
    testUser.username = 'test';
    testUser.password = await argon2.hash('TestPassword1!')
    await UserRepository.save(testUser);
}