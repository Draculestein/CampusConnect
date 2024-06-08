import { Organization } from '../db/models/Organization.model';
import logger from '../config/logger';
import { OrganizationRepository } from '../db/repositories/Organization.repositories';

const numberPerPage = 5;

export async function searchByName(name: string): Promise<[Organization[] | null, any]> {
    try {
        const result = await OrganizationRepository.find({
            where: {
                name
            }
        })

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
    numOfYears: number | null,
    cityType: string | null,
    climate: string | null,
    isPublic: boolean | null,
    country: string | null,
): Promise<[Organization[] | null, number, any]> {

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
                url: true,
                iconUrl: true,
                backgroundSearchUrl: true
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

export async function searchByUrl(url: string) {
    try {
        const result = await OrganizationRepository.findOne({
            where: {
                url
            }
        });

        return result;
    } catch (error) {
        logger.error(error);
        return null;
    }
}