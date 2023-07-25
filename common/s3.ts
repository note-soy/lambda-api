import {GetObjectCommand, NoSuchKey, S3Client, S3ServiceException} from "@aws-sdk/client-s3";

const REGION = "us-east-1";
const s3Client = new S3Client({ region: REGION });

const BUCKET = "note.soy-inventory";

interface Note {
    title: string;
    content: string;
}

export async function getNote(key: string): Promise<Note> {

    try {
        const results = await s3Client.send(new GetObjectCommand({
            Bucket: BUCKET,
            Key: key,
        }));

        return {
            title: key,
            content: await results?.Body?.transformToString() ?? "",
        };

    } catch (err) {
        const s3Err = <S3ServiceException>err;
        if (s3Err.name === "NoSuchKey") {
            return {
                title: key,
                content: "",
            }
        }
        throw err;
    }

}