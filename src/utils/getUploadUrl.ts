"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

export default async function getUploadUrl(username: string) {
    try {
        const client = new S3Client({
            region: 'ap-south-1',
            credentials: {
                accessKeyId: `${process.env.accessKeyId}`,
                secretAccessKey: `${process.env.secretAccessKey}`
            },
        });


        const uploadUrl = async (key: string, contentType: string) => {
            const cmd = new PutObjectCommand({
                Bucket: "vishal-upload-image-nextjs",
                Key: `${username}/${key}`,
                ContentType: contentType,
            });
            const url = await getSignedUrl(client, cmd, { expiresIn: 120 });
            return url;

        };
        const fileName = `image-${nanoid()}.jpeg`;
        const url = await uploadUrl(fileName, "image/jpeg");
        // console.log(url);

        return { message: 'Created Signed URL for Put object', success: true, url: url, fileName: fileName };

    } catch (error) {
        return { message: 'contact admin some error', success: false };
    }
}