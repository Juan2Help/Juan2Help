const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendVerificationEmail(email, name, token) {
  console.log("SENDING EMAIL TO: ", email);
  try {
    await sendgrid.send({
      to: `${email}`, // Your email where you'll receive emails
      from: `${process.env.GMAIL_EMAIL}`, // your website email address here
      subject: `Verify your Juan2Help account`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <head>
          <meta charset="utf-8">
        
        <title>Juan2Help Verification Email</title>
          <meta name="description" content="Verification Email">
          <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        
        
        </head>
        
        <body>
          <div style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
                </div>
                <div  style="margin-left: 20px;margin-right: 20px; font-size:20px">
                    <h3>Hi ${name.split()[0]}!</h3>
                <div style="font-size: 16px;">
                <p><strong>Thank you for registering with Juan2Help!</strong></p>
                <p>Here's your verification link: <a href="${
                  process.env.NEXTAUTH_URL
                }api/auth/verify/${token}" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Click here.</a> </p>
                <br>
                </div>
                <p style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards,<br>Juan2Help Team</p>
                </div>
        </body>
        </html>`,
    });

    console.log("EMAIL SENT");
  } catch (error) {
    // Throw error
    console.log("ERROR SENDING EMAIL", error);
    return false;
  }

  return true;
}
