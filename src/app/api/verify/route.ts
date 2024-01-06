// pages/api/verify.ts
import User from '@/model/userModel';
import decodeJwt from '@/utils/decodeJwt';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {

    try {
        // Extract token from the query parameters in the URL
        const token = req.nextUrl.searchParams.get('token') as string;

        // Decode the JWT token to get the information
        const decodedJwt = await decodeJwt(token) as { message?: { username: string }; success: boolean };

        // Check if decoding was successful
        if (decodedJwt.success) {
            console.log(decodedJwt);

            // Query the database to find the user by the decoded username
            const resFromDb = await User.findOne({
                username: decodedJwt.message?.username
            });

            // Check if the user is not verified and the token matches
            if (!resFromDb.isVerified && resFromDb.verifyToken === token) {
                // Update the database to mark the user as verified
                await User.findOneAndUpdate({ username: resFromDb.username }, { isVerified: true });

                // Verification success, redirect to the login page
                return NextResponse.redirect(new URL('/login', req.url));
            } else if (resFromDb.verifyToken !== token) {
                // User token doesn't match
                return NextResponse.json({ message: "Invaild token, please check" });

            }
            else {
                // User alredy verified
                return NextResponse.json({ message: "Already verified, try again later" });

            }
        } else {
            // Decoding JWT was not successful
            return NextResponse.json({ message: "Unable to verify, try again later" });
        }
    } catch (error) {
        // Handle any errors that might occur during the process
        console.log(error);
        return NextResponse.json({ message: "Unable to verify, try again later" });
    }

}
