// pages/api/verify.ts
import User from '@/model/userModel';
import decodeJwt from '@/utils/decodeJwt';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";


export async function POST(req: NextRequest) {

    try {
        // Destructure the 'password' and 'token' from the JSON request body
        const { password, token } = await req.json() as { password: string, token: string };

        // Generate a salt and hash the new password using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Decode the JWT token from the request
        const decodedJwt = await decodeJwt(token) as { message?: { username: string; }; success: boolean };

        // Check if decoding the JWT was successful
        if (decodedJwt.success) {
            // console.log(decodedJwt);

            // Find the user in the database based on the decoded username
            const resFromDb = await User.findOne({
                username: decodedJwt.message?.username
            });

            // Check if the user is verified and the token matches the forgot password token
            if (resFromDb.isVerified && resFromDb.forgotPasswordToken === token) {
                // Update the user's password in the database
                await User.findOneAndUpdate({ username: resFromDb.username }, { password: hash });

                // Return a JSON response indicating successful password update
                return NextResponse.json({ message: 'Password has been updated', success: true }, { status: 200 });
            } else {
                // Return a JSON response indicating that the user is not verified
                return NextResponse.json({ message: 'User not verified, try again later', success: false }, { status: 400 });
            }
        } else {
            // Return a JSON response indicating that the process was unable to continue
            return NextResponse.json({ message: 'Invalid token', success: false }, { status: 400 });
        }
    } catch (error) {
        // Handle errors that may occur during the password reset process
        // and return a JSON response indicating the inability to process
        // console.log(error);
        return NextResponse.json({ message: 'Unable to process, try again later', success: false }, { status: 400 });
    }

}
