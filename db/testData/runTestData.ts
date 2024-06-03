import { OrganizationRepository } from '../repositories/Organization.repositories';
import { Organization } from '../models/Organization.model';

export function runTestData() {
    const uOfU = new Organization();
    uOfU.numOfYears = 4;
    uOfU.cityType = 'mixed';
    uOfU.climate = 'cold';
    uOfU.isPublic = true;
    uOfU.country = 'United States';
    uOfU.url = '/uofu';
    uOfU.iconUrl = '/images/UofU.png';
    uOfU.backgroundSearchUrl = '/images/uofubuilding.jpeg';

    OrganizationRepository.save(uOfU);
}