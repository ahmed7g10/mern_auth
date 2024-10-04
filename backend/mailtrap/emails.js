

const { VERIFICATION_EMAIL_TEMPLATE } = require('./emailTemplates');
const { client, sender } = require('./mailtrap.config');

const sendVerificationEmail=async(email,verificationToken)=>{
    const recipient=[{email}]
    try {
        const res=await client.send({
            from:sender,
            to:recipient,
            subject:'verify your email',
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),            category:"Email Verification" 
        })
        console.log("Email sent successfully",res);
        
    } catch (error) {
        console.log(error.message);
    }
}
const sendWelcomeEmail=async(email,name)=>{
    const recipient=[{email}];
    try {
        const res=await client.send({
            from:sender,
            to:recipient,
            subject:'welcome',
            html:`
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h1 style="color: #4CAF50; text-align: center;">Welcome, ${name}!</h1>
                    <p style="font-size: 16px; color: #333;">We’re excited to have you onboard. Here’s a quick overview of what to expect from our platform:</p>
                    <ul style="font-size: 16px; color: #555; list-style-type: disc; padding-left: 20px;">
                        <li>Access to exclusive content and resources.</li>
                        <li>Regular updates and tips tailored just for you.</li>
                        <li>24/7 support to assist you with any questions.</li>
                    </ul>
                    <p style="font-size: 16px; color: #333;">If you have any questions, feel free to reach out to us at any time!</p>
                    <p style="font-size: 16px; color: #333;">Thank you for joining us, and we look forward to a great journey together!</p>
                    <p style="font-size: 16px; color: #333;">Best regards,</p>
                    <p style="font-size: 16px; color: #333;">The Team</p>
                    <hr style="border: none; height: 1px; background-color: #ddd;">
                    <button onclick="alert(99)">click me</button>
                    <footer style="font-size: 12px; color: #999; text-align: center;">
                        <p>Our Company Inc., 1234 Street, City, Country</p>
                        <p><a href="https://example.com" style="color: #4CAF50;">Visit our website</a> | <a href="mailto:support@example.com" style="color: #4CAF50;">Contact Support</a></p>
                    </footer>
                </div>
            `
        })
        console.log(res);
    } catch (error) {
     console.log(error.message);

        
    }
    
}
const sendRestPasswordLink=async(email,url_c)=>{
    const recipient=[{email}];
    try {
        const res=await client.send({
            from:sender,
            to:recipient,
            subject:"Reset Your Password",
            html:` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        It looks like you requested a password reset. Click the button below to reset your password:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${url_c}" style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">
                            Reset Password
                        </a>
                    </div>
                    <p style="font-size: 16px; color: #555;">
                        If you didn’t request this, you can safely ignore this email.
                    </p>
                    <hr style="border: none; height: 1px; background-color: #ddd;">
                    <footer style="font-size: 12px; color: #999; text-align: center;">
                        <p>Our Company Inc., 1234 Street, City, Country</p>
                        <p><a href="https://example.com" style="color: #4CAF50;">Visit our website</a> | <a href="mailto:support@example.com" style="color: #4CAF50;">Contact Support</a></p>
                    </footer>
                </div>`,
        })
        console.log(res);
    } catch (error) {
        console.log(error.message);
        
    }
}
const sendPasswordChangedSuccess=async(email,name)=>{
   try {
    const recipient=[{email}];
    const res=await client.send({
        from:sender,
        to:recipient,
        subject:'password changed successfully',
        html:`
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                    <h2 style="color: #333; text-align: center;">Password Changed Successfully</h2>
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        Hi ${name},
                    </p>
                    <p style="font-size: 16px; color: #333; line-height: 1.6;">
                        We wanted to let you know that your password has been changed successfully. If you didn’t make this change, please contact our support team immediately.
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="https://example.com/login" style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">
                            Login to Your Account
                        </a>
                    </div>
                    <p style="font-size: 16px; color: #555;">
                        If you have any issues or did not request this change, feel free to reach out to our support team.
                    </p>
                    <hr style="border: none; height: 1px; background-color: #ddd;">
                    <footer style="font-size: 12px; color: #999; text-align: center;">
                        <p>Our Company Inc., 1234 Street, City, Country</p>
                        <p><a href="https://example.com" style="color: #4CAF50;">Visit our website</a> | <a href="mailto:support@example.com" style="color: #4CAF50;">Contact Support</a></p>
                    </footer>
                </div>
        `
    })
    console.log(res);
   } catch (error) {
    console.log(error.message);
    
   }
    
}
module.exports={sendVerificationEmail,sendWelcomeEmail,sendRestPasswordLink,sendPasswordChangedSuccess}