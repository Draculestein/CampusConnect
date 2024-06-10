import {
    S3Client,
    S3ClientConfig,
    ListBucketsCommand,
    CreateBucketCommand,

} from "@aws-sdk/client-s3";
import logger from '../logger/logger';


// Temp S3 config for dev purposes
const s3Config: S3ClientConfig = {
    endpoint: 'http://localhost:9000',
    credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER!,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD!
    },
    forcePathStyle: true
};

const s3Client = new S3Client(s3Config);

export async function initializeBucket(): Promise<[boolean, any]> {
    try {
        // Check if the CampusConnect bucket exists
        const bucketsList = await s3Client.send(new ListBucketsCommand());

        if (bucketsList.Buckets && (bucketsList.Buckets?.find((bucket) => bucket.Name === 'CampusConnect'))) 
            return [true, null];

        await s3Client.send(new CreateBucketCommand({
            Bucket: 'CampusConnect'
        }));

        return [true, null];
    } catch(error) {
        logger.error(error);
        return [false, error];
    }
}