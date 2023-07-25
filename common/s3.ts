import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";

const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION });

const BUCKET = "note.soy-inventory";

export const get_note = async (key: string) => {

    const results = await s3Client.send(new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
    }));

    return await results?.Body?.transformToString();

}