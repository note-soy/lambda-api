import {mockClient} from "aws-sdk-client-mock";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Readable} from 'stream';
import {sdkStreamMixin} from '@aws-sdk/util-stream-node';
import {getNoteContent} from "./s3"
import 'aws-sdk-client-mock-jest';
import {BUCKET} from "./s3";

const s3mock = mockClient(S3Client);

describe('s3 backend', () => {

    beforeEach(() => {
        s3mock.reset();
    });

    it('returns the content of the s3 object as the note content', async () => {

        const stream = new Readable();
        stream.push('test note');
        stream.push(null);

        const sdkStream = sdkStreamMixin(stream);

        s3mock.on(GetObjectCommand).resolves({
            Body: sdkStream,
        });

        const result = await getNoteContent('key');

        expect(s3mock).toHaveReceivedCommandWith(GetObjectCommand, {
            Bucket: BUCKET,
            Key: 'key',
        });
        expect(result.content).toEqual('test note');

    });

    it('returns empty content when note does not exist', async () => {

        s3mock.on(GetObjectCommand).rejects({
            name: 'NoSuchKey',
        });

        const result = await getNoteContent('key');

        expect(s3mock).toHaveReceivedCommandWith(GetObjectCommand, {
            Bucket: BUCKET,
            Key: 'key',
        });
        expect(result.content).toEqual('');

    });

    it('raises errors other than non-existent notes', async () => {

        s3mock.on(GetObjectCommand).rejects();

        await expect(
            async () => await getNoteContent('key')
        ).rejects.toThrow();

        expect(s3mock).toHaveReceivedCommandWith(GetObjectCommand, {
            Bucket: BUCKET,
            Key: 'key',
        });

    });

});