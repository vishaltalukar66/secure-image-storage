import nodemailer from "nodemailer";
/* eslint-disable */

export default async function sendResetPassEmail(token: string, to: string) {
  const transport = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: "vishal.talukar.dev@gmail.com",
      pass: `${process.env.PASS}`
    }
  });

  const resetPasswordLink = `${process.env.RESET}?token=${token}`

  const message = {
    from: "vishal.talukar.dev@gmail.com",
    to: to,
    subject: "Message title",
    text: "Plaintext version of the message",
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              text-align: center;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              text-decoration: none;
              color: #fff;
              border-radius: 5px;
              margin-top: 20px;
              background-color: #28a745;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset</h1>
            <p>
              You have requested to reset your password. Click the button below to reset it.
            </p>
            <!-- Add a link or button for password reset -->
            <a href="${resetPasswordLink}" class="button">Reset Password</a>
            <p>
              If the button above does not work, you can also copy and paste the following link into your browser:
            </p>
            <!-- Display the reset password link -->
            <p><strong>${resetPasswordLink}</strong></p>
          </div>
        </body>
        </html>
        `
  };

  const info = await transport.sendMail(message);
  return info.messageId;
}