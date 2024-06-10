import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

// Temp S3 config for dev purposes
const s3Config: S3ClientConfig = {
    endpoint: 'http://localhost:9000',
    credentials: {
        accessKeyId: process.env.MINIO_ROOT_USER!,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD!
    }
};

const s3Client = new S3Client(s3Config);