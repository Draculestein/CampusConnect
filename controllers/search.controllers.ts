import { Organization } from '../db/models/Organization.model';
import logger from '../config/logger';
import { OrganizationRepository } from '../db/repositories/Organization.repositories';

const numberPerPage = 5;

export async function searchByName(name: string) {
    try {
        const result = await OrganizationRepository
            .createQueryBuilder('orgSearch')
            .innerJoin('orgSearch.id', 'org')
            .where('org.name = :name', { name })
            .getMany();

        const resultTuple: [Organization[], any] = [result, null];

        return resultTuple;
    } catch (error) {
        logger.error('Search by name error:\n' + error);
        const resultTuple: [null, any] = [null, error];

        return resultTuple;
    }
}

export async function searchByFilters(
    page: number,
    numOfYears: string | null,
    cityType: string | null,
    climate: string | null,
    isPublic: boolean | null,
    country: string | null,
) {

    page = page < 1 ? 1 : page;
    try {
        let where = {};
        where = {
            ...where,
            ...(numOfYears && { numOfYears }),
            ...(cityType && { cityType }),
            ...(climate && { climate }),
            ...(isPublic && { isPublic }),
            ...(country && { country })
        }

        const result = await OrganizationRepository.findAndCount({
            select: {

            },
            where,
            skip: numberPerPage * (page - 1),
            take: numberPerPage
        });

        const resultTuple: [Organization[], number, any] = [result[0], result[1], null];
        return resultTuple;
    } catch (error) {
        logger.error('Search by filter error:\n' + error);
        const resultTuple: [null, number, any] = [null, 0, error];
        return resultTuple;
    }
}