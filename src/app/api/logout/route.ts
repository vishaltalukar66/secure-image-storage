import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Create a JSON response indicating successful user logout
        const response = NextResponse.json({ message: 'User logged out', success: true }, { status: 200 });

        // Clear the 'token' cookie by setting it to an empty string and expiring it now
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(Date.now()),
        });

        // Return the response indicating successful logout
        return response;
    } catch (error) {
        // Handle errors that may occur during the logout process
        return NextResponse.json({ message: 'Some error, contact admin', success: false }, { status: 400 });
    }

}