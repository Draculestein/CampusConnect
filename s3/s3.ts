import {
    S3Client,
    S3ClientConfig,
    ListBucketsCommand,
    CreateBucketCommand,
    PutObjectCommandInput,
    PutObjectCommand,

} from "@aws-sdk/client-s3";
import logger from '../logger/logger';


// Temp S3 config for dev purposes
const s3Config: S3ClientConfig = {
    region: 'us-east-1',
    endpoint: 'http://localhost:9000',
    credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER!,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD!
    },
    forcePathStyle: true
};

const s3Client = new S3Client(s3Config);
const bucketName = process.env.BUCKET_NAME;

export async function initializeBucket(): Promise<[boolean, any]> {
    try {
        // Check if the CampusConnect bucket exists
        const bucketsList = await s3Client.send(new ListBucketsCommand());

        if (bucketsList.Buckets && (bucketsList.Buckets?.find((bucket) => bucket.Name === bucketName)))
            return [true, null];

        await s3Client.send(new CreateBucketCommand({
            Bucket: bucketName
        }));

        return [true, null];
    } catch (error) {
        logger.error(error);
        return [false, error];
    }
}

export async function uploadFile(inBucketPath: string, fileContent: Buffer): Promise<[boolean, any]>  {
    try {
        const input: PutObjectCommandInput = {
            Bucket: bucketName,
            Key: inBucketPath,
            Body: fileContent
        }

        const result = await s3Client.send(new PutObjectCommand(input));

        if(result.$metadata.httpStatusCode === 200)
            return [true, null];
        else
            return [false, result.$metadata];
    } catch (error) {
        logger.error(error);
        return [false, error];
    }
}