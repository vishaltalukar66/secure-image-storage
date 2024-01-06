import decodeJwt from "@/utils/decodeJwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        // Retrieve the token from the HTTP-only cookie
        const token = req.cookies.get('token')?.value as string;

        // Decode the JWT token to get user information
        const decodedJwt = await decodeJwt(token) as { message?: object; success: boolean };

        // Respond with the decoded JWT payload
        return NextResponse.json(decodedJwt);
    } catch (error) {
        // Handle errors that may occur during decoding or other processes
        return NextResponse.json({ message: 'Some error, contact admin', success: false }, { status: 400 });
    }
}