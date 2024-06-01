import { OrganizationSearch } from '../db/models/OrganizationSearch.model';
import logger from '../config/logger';
import { OrganizationSearchRepository } from '../db/repositories/OrganizationSearch.repositories';

const numberPerPage = 5;

export async function searchByName(name: string) {
    try {
        const result = await OrganizationSearchRepository
            .createQueryBuilder('orgSearch')
            .innerJoin('orgSearch.id', 'org')
            .where('org.name = :name', { name })
            .getMany();

        const resultTuple: [OrganizationSearch[], any] = [result, null];

        return resultTuple;
    } catch (error) {
        logger.error('Search by name error:\n' + error);
        const resultTuple: [null, any] = [null, error];

        return resultTuple;
    }
}

export async function searchByFilters(
    page: number,
    numOfYears?: string,
    cityType?: string,
    climate?: string,
    isPublic?: boolean,
    country?: string,
) {

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

        const result = await OrganizationSearchRepository.findAndCount({
            where,
            skip: numberPerPage * page,
            take: numberPerPage
        });

        const resultTuple: [OrganizationSearch[], number, any] = [result[0], result[1], null];
        return resultTuple;
    } catch (error) {
        logger.error('Search by filter error:\n' + error);
        const resultTuple: [null, number, any] = [null, 0, error];
        return resultTuple;
    }
}