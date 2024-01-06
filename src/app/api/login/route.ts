import User from "@/model/userModel";
import userTypes from "@/types/userType";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbCon";

export async function POST(req: NextRequest) {
    try {
        // Establish a connection to the database
        await connect();

        // Extract the request body as userTypes
        const reqBody = await req.json() as userTypes;

        // Query the database to find the user by the provided username
        const resFromDb = await User.findOne({ username: reqBody.username });


        if (!resFromDb) {
            return NextResponse.json({ message: 'User not found, please sign up', success: false }, { status: 400 });
        }

        // Check if the provided password matches the stored password in the database
        const passwordMatch: boolean = await bcrypt.compareSync(reqBody.password, resFromDb.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: 'Invalid password', success: false }, { status: 400 });
        } else if (resFromDb.isVerified && passwordMatch) {
            // Generate a JWT token with user data for authentication
            const jwtData = {
                id: resFromDb._id,
                username: resFromDb.username
            };

            const jwtPayload = await jwt.sign(jwtData, `${process.env.SECRECT}`, { expiresIn: "1h" });

            // Prepare the response with a success message and set the token as an HTTP-only cookie
            const response = NextResponse.json({ message: 'Successfully Logged In', success: true }, { status: 200 });
            response.cookies.set('token', jwtPayload, {
                httpOnly: true,
                expires: new Date(Date.now() + 60 * 60 * 1000),
            });

            return response;
        } else {
            // User is not verified, request verification
            return NextResponse.json({ message: 'Please verify your account', success: false }, { status: 400 });
        }
    } catch (error) {
        // Handle any errors that might occur during the process
        return NextResponse.json({ message: 'Some error, contact admin', success: false }, { status: 400 });
    }


}