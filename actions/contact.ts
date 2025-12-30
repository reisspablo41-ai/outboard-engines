'use server';

import { resend } from "@/lib/resend";

export async function submitContactForm(prevState: any, formData: FormData) {
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    if (!email || !message) {
        return { success: false, message: "Email and Message are required." };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Outboards Support <support@boatsoutboardmotorsandpartsforsale.com>',
            to: ['support@boatsoutboardmotorsandpartsforsale.com'],
            subject: `New Contact Form: ${firstName} ${lastName}`,
            text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
            `,
            replyTo: email
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, message: "Failed to send email." };
        }

        return { success: true, message: "Message sent successfully!" };

    } catch (e) {
        console.error("Server Action Error:", e);
        return { success: false, message: "An unexpected error occurred." };
    }
}
