const { jwtVerify } = require('jose');

export default async function decodeJwt(token: string) {
    try {
        // Verify the JWT token using jwtVerify function
        const { payload, protectedHeader } = await jwtVerify(
            token, // The JWT token to be verified
            new TextEncoder().encode(`${process.env.SECRECT}`) // Encode the secret using TextEncoder
        );

        // If verification is successful, return the decoded payload and indicate success
        return {
            message: payload, // Decoded payload of the JWT
            success: true,    // Indicate success
        };
    } catch (error) {
        // If an error occurs during verification, log the error and indicate failure
        // Note: You might want to handle different types of errors separately (e.g., token expired)
        // console.log(error)
        return { success: false }; // Indicate failure
    }


}