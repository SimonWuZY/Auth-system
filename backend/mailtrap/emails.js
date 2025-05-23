import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { client } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "验证您的电子邮件地址",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })

        console.log("邮件发送成功", response);
    }
    catch (error) {
        throw new Error("邮件发送失败", error);
    }
}