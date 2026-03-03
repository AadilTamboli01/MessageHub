import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./EmailTemplate.js";

export const sendwelComeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome To Chatify",
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if (error) {
        console.log("Error in sending welcome email",error);
        throw new Error("Failed to send welcome email");
    }
    else {
        console.log("send email ", data)
    }
}
