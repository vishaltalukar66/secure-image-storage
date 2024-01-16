import { NextRequest, NextResponse } from 'next/server';
import decodeJwt from './utils/decodeJwt';

// Configuration for the middleware, specifying the paths to be matched
export const config = {
    matcher: ['/', '/login', '/signup', '/profile', '/reset', '/reset-request'],
};

// Middleware function to handle authentication and redirection
export async function middleware(request: NextRequest) {
    // Extract the path from the request URL
    const path = request.nextUrl.pathname;

    // Determine if the current path is a public path (does not require authentication)
    const isPublic =
        path === '/login' || path === '/signup' || path === '/' || path === '/reset-request' || path === '/reset';

    // Retrieve the token from the request cookies
    const token = request.cookies.get('token')?.value;

    // Check if the user has a token and is trying to access a public path
    if (token && isPublic) {
        // If the token is valid, redirect to the profile page
        const decodedJwt = await decodeJwt(token) as { message?: object; success: boolean };
        if (decodedJwt.success) {
            // console.log(decodedJwt);
            return NextResponse.redirect(new URL('/profile', request.url));
        } else {
            // If the token is invalid, redirect to the login page
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else if (!isPublic && !token) {
        // If the user is trying to access a private path without a token, redirect to the login page
        return NextResponse.redirect(new URL('/login', request.url));
    }
    // Continue to the next middleware or route handler
}
