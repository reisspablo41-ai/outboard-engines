'use server';

import { resend } from "@/lib/resend";

export async function submitQuoteRequest(prevState: any, formData: FormData) {
    const fullName = formData.get("full_name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string; // Shipping Location
    const message = formData.get("message") as string;
    const productName = formData.get("product_name") as string;
    const quantity = formData.get("quantity") as string;
    const sku = formData.get("sku") as string;

    if (!email || !fullName || !productName) {
        return { success: false, message: "Missing required fields." };
    }

    try {
        // 1. Send Email to Admin
        const adminResponse = await resend.emails.send({
            from: 'Outboards Quotes <support@boatsoutboardmotorsandpartsforsale.com>',
            to: ['support@boatsoutboardmotorsandpartsforsale.com'],
            subject: `New Quote Request: ${productName}`,
            text: `
New Quote Request Received!

Product Details:
Product: ${productName}
Quantity: ${quantity}
SKU: ${sku || 'N/A'}

Customer Details:
Name: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}
Location: ${location}

Message:
${message || 'No additional message.'}
            `,
            replyTo: email
        });

        if (adminResponse.error) {
            console.error("❌ [Quote] Admin Email Failed:", adminResponse.error);
        } else {
            console.log("✅ [Quote] Admin Email Sent:", adminResponse.data);
        }

        // 2. Send Confirmation to User
        const userResponse = await resend.emails.send({
            from: 'Outboards Sales <support@boatsoutboardmotorsandpartsforsale.com>',
            to: [email],
            subject: `Quote Request Received: ${productName}`,
            text: `
Hi ${fullName},

We have received your quote request for the ${productName}. 

Our team is reviewing your request and checking shipping options to ${location}.
You will receive a detailed quote with pricing and availability shortly.

Request Details:
Product: ${productName} (x${quantity})

If you have urgent questions, please reply to this email.

Best regards,
Outboards Sales Team
            `
        });

        if (userResponse.error) {
            console.error("❌ [Quote] User Email Failed:", userResponse.error);
        } else {
            console.log("✅ [Quote] User Email Sent:", userResponse.data);
        }

        return { success: true, message: "Quote request sent successfully!" };

    } catch (e) {
        console.error("❌ [Quote] Critical Error:", e);
        return { success: false, message: "Failed to send quote request." };
    }
}
