import { connect } from "@/dbConfig/dbCon";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import sendEmail from "@/utils/sendEmail";

export async function POST(req: NextRequest) {

    try {
        // Connect to the database
        await connect();

        // Extract the 'username' from the JSON request body
        const username = await req.json();

        // Find the user in the database based on the provided username
        const resFromDb = await User.findOne({ username: username });

        // Check if the user exists in the database
        if (!resFromDb) {
            // console.log(username);
            // console.log(resFromDb);

            // Return a JSON response indicating that the user was not found
            return NextResponse.json({ message: 'User not found, please sign up', success: false }, { status: 400 });
        }
        // Check if the user is verified
        else if (resFromDb.isVerified) {
            // Create JWT data for the forgot password token
            const jwtData = {
                id: resFromDb._id,
                username: resFromDb.username
            };
            const expiration = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day in seconds

            // Sign the JWT token with the secret and set expiration to 1 day
            const jwtPayload = await jwt.sign(jwtData, `${process.env.SECRECT}`,
                { expiresIn: expiration });

            // Update the user's forgot password token in the database
            await User.findOneAndUpdate({ username: resFromDb.username }, { forgotPasswordToken: jwtPayload });

            // Call the email sender function to send the reset link
            const callEmailSender = await sendEmail(resFromDb.username, 'reset', jwtPayload);
            // console.log(callEmailSender);

            // Check if the email sending was successful
            if (callEmailSender.success) {
                // Return a JSON response indicating the successful sharing of the reset link
                return NextResponse.json({ message: 'Reset link has been sent to your email, please check your inbox/spam folder', success: true }, { status: 200 });
            } else {
                // Return a JSON response indicating the inability to send the email
                return NextResponse.json({ message: 'Unable to send email', success: false }, { status: 400 });
            }
        } else {
            // Return a JSON response indicating that the user needs to verify their account
            return NextResponse.json({ message: 'Please verify your account', success: false }, { status: 400 });
        }
    } catch (error) {
        // Handle errors that may occur during the process and return a JSON response
        // console.log(error);
        return NextResponse.json({ message: 'Some error, contact admin', success: false }, { status: 400 });
    }

}