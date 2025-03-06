import {
    GetObjectCommand,
    GetObjectCommandInput,
    GetObjectCommandOutput,
    PutObjectCommand,
    S3Client,
    S3ServiceException
} from "@aws-sdk/client-s3";

const REGION = "us-east-1";
export const s3Client = new S3Client({ region: REGION });
export const BUCKET = "note.soy-inventory";

export interface Note {
    title: string;
    content: string;
}

// TODO see if an S3 object can share a name with a prefix
export async function getNoteContent(key: string): Promise<Note> {

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

export async function saveNoteContent(key: string, content: string): Promise<void> {
    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: content,
            ContentType: 'text/plain'
        }));
    } catch (err) {
        console.error(`Error saving note ${key}:`, err);
        throw err;
    }
}