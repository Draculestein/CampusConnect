import logger from '../config/logger';
import { OrganizationSearchRepository } from '../db/repositories/OrganizationSearch.repositories';

const numberPerPage = 5;

export async function searchByName(name: string, page: number) {
    try {
        const result = await OrganizationSearchRepository
            .createQueryBuilder('orgSearch')
            .innerJoin('orgSearch.id', 'org')
            .where('org.name = :name', { name })
            .skip(numberPerPage * (page - 1))
            .take(5);

        return result;
    } catch (error) {
        logger.error('Search by name error:\n' + error);
    }
}