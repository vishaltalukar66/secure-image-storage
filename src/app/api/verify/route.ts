// pages/api/verify.ts
import User from '@/model/userModel';
import decodeJwt from '@/utils/decodeJwt';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {

    try {
        // Destructure the 'password' and 'token' from the JSON request body
        const { token } = await req.json() as { token: string };

        // Decode the JWT token to get the information
        const decodedJwt = await decodeJwt(token) as { message?: { username: string }; success: boolean };

        // Check if decoding was successful
        if (decodedJwt.success) {
            console.log(decodedJwt);

            // Query the database to find the user by the decoded username
            const resFromDb = await User.findOne({
                username: decodedJwt.message!.username
            });
            console.log(resFromDb);

            // Check if the user is not verified and the token matches
            if (!resFromDb.isVerified && resFromDb.verifyToken === token) {
                // Update the database to mark the user as verified
                await User.findOneAndUpdate({ username: resFromDb.username }, { isVerified: true });
                console.log('success return');

                // Verification success, redirect to the login page
                return NextResponse.json({ message: "Verified" }, { status: 200 });
            } else if (resFromDb.verifyToken !== token) {
                // User token doesn't match
                return NextResponse.json({ message: "Invaild token, please check" }, { status: 400 });

            }
            else {
                // User alredy verified
                return NextResponse.json({ message: "Already verified, try again later" }, { status: 400 });

            }
        } else {
            // Decoding JWT was not successful
            return NextResponse.json({ message: "Unable to verify, try again later" }, { status: 400 });
        }
    } catch (error) {
        // Handle any errors that might occur during the process
        console.log(error);
        return NextResponse.json({ message: "Unable to verify, try again later" }, { status: 400 });
    }

}
