import nodemailer from "nodemailer";
import sendVerificationEmail from "./sendVerificationEmail";
import sendResetPassEmail from "./sendResetPassEmail";

export default async function sendEmail(to: string, type: string, token: string) {
    try {
        // Check the type of email to be sent (verify or reset)
        if (type === 'verify') {
            // If the type is 'verify', send a verification email
            const res = await sendVerificationEmail(token, to);
            return {
                message: res,       // Response message from the email sending process
                success: true        // Indicate success
            };
        } else {
            // If the type is 'reset', send a reset password email
            const res = await sendResetPassEmail(token, to);
            return {
                message: res,       // Response message from the email sending process
                success: true        // Indicate success
            };
        }
    } catch (error) {
        // If an error occurs during the email sending process, catch the error
        // console.log(error)
        return {
            message: "error",      // Indicate that an error occurred
            success: false          // Indicate failure
        };
    }

}