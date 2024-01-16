import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Destructure the username from the request body
        const { username } = await req.json();

        // Create an S3 client with the provided AWS credentials
        const client = new S3Client({
            region: 'ap-south-1',
            credentials: {
                accessKeyId: `${process.env.accessKeyId}`,
                secretAccessKey: `${process.env.secretAccessKey}`
            },
        });

        // Create a ListObjectsV2Command to list objects in the S3 bucket with a specific prefix
        const cmd = new ListObjectsV2Command({
            Bucket: `${process.env.bucket}`,
            Prefix: `${username}`
        });

        // Initialize an array to store the retrieved objects
        let contents: { key: string; keyUrl: string; id: string }[] = [];
        let isTruncated = true;

        // Continue fetching objects while there are more to retrieve
        while (isTruncated) {
            const { Contents, IsTruncated, NextContinuationToken } =
                await client.send(cmd);

            // Map over the retrieved objects and add them to the contents array
            Contents!.map((c) => contents.push({ key: c.Key!, keyUrl: `/api/get-signed-url?key=${c.Key}`, id: nanoid() }));

            // Update the isTruncated flag and continuation token for the next iteration
            isTruncated = IsTruncated!;
            cmd.input.ContinuationToken = NextContinuationToken;
        }

        // Log the retrieved contents (optional)
        // console.log(contents);

        // Return a JSON response with the retrieved images
        return NextResponse.json({ message: 'Retrieved all images', success: true, data: contents }, { status: 200 });
    } catch (error) {
        // Return a JSON response in case of an error
        return NextResponse.json({ message: 'Some error, contact admin', success: false }, { status: 400 });
    }
}
