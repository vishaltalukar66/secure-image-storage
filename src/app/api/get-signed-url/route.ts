import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function GET(req: NextRequest) {
    try {
        // Extract the 'key' from the query parameters
        const key = await req.nextUrl.searchParams.get('key');

        if (key) {
            // Create an S3 client with the provided AWS credentials
            const client = new S3Client({
                region: 'ap-south-1',
                credentials: {
                    accessKeyId: `${process.env.accessKeyId}`,
                    secretAccessKey: `${process.env.secretAccessKey}`
                },
            });

            // Function to get a signed URL for the specified S3 object key
            const getSignedUrlForS3Object = async (key: string) => {
                const cmd = new GetObjectCommand({
                    Bucket: `${process.env.bucket}`,
                    Key: `${key}`,
                });

                // Generate a signed URL with a 10-minute expiration time
                const url = await getSignedUrl(client, cmd, { expiresIn: 600 });
                return url;
            };

            // Get the signed URL for the specified key
            const url = await getSignedUrlForS3Object(key);
            // console.log(url);

            // Redirect the user to the signed URL
            return NextResponse.redirect(url);
        } else {
            // Return an error response if the 'key' is not provided in the query parameters
            return NextResponse.json({ message: "Unable to generate URL, check the URL and try again later", success: false }, { status: 400 });
        }
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error(error);
        return NextResponse.json({ message: "Unable to verify, try again later", success: false }, { status: 400 });
    }
}
