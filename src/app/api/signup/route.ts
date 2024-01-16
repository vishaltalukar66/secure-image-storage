import { connect } from "@/dbConfig/dbCon";
import User from "@/model/userModel";
import userTypes from "@/types/userType";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendEmail from "@/utils/sendEmail";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await connect();

        // Extract the request body as 'userTypes'
        const reqBody = await req.json() as userTypes;

        // Check if a user with the provided email already exists in the database
        const resFromDb = await User.findOne({ email: reqBody.username });

        // If a user with the provided email already exists, return an error response
        if (resFromDb) {
            return NextResponse.json({ message: 'User already exists, please login', success: false }, { status: 400 });
        }


        // Generate a salt and hash the user's password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(reqBody.password, salt);
        const expiration = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 1 day in seconds

        // Create a verification token using the user's username
        const token = await jwt.sign({ username: reqBody.username }, `${process.env.SECRECT}`, { expiresIn: expiration });

        // Create a new user instance with the provided details
        const newuser = new User({
            username: reqBody.username,
            password: hash,
            verifyToken: token,
        });

        // Save the new user to the database
        await newuser.save();

        // Call the email sender function to send the verification email
        const callEmailSender = await sendEmail(reqBody.username, 'verify', token);

        // Check if the email sending was successful
        if (callEmailSender.success) {
            // Return a JSON response indicating the successful user registration
            return NextResponse.json({ message: 'Successfully saved user into DB', success: true }, { status: 200 });
        } else {
            // Return a JSON response indicating the inability to send the email
            return NextResponse.json({ message: 'Unable to send email', success: false }, { status: 400 });
        }
    } catch (error) {
        // Handle errors that may occur during the process and return a JSON response
        // console.log(error);
        return NextResponse.json({ message: 'Some error, contact admin', success: false }, { status: 400 });
    }


}