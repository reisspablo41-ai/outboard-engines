'use server';

import { createClient } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import { headers } from "next/headers";

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

interface UserDetails {
    email: string;
    full_name: string;
    address: string;
    phone: string;
}

export async function processCheckout(items: CartItem[], userDetails: UserDetails) {
    const supabase = await createClient();

    if (!items || items.length === 0) {
        return { success: false, message: "Cart is empty." };
    }

    try {
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // 1. Create Order
        // Since we are using "guest" checkout for this flow (based on user request for simple flow),
        // we might not have a user_id if they aren't logged in. 
        // The schema supports user_id as nullable? Let's check schema.
        // Schema says: user_id uuid REFERENCES auth.users(id) - it doesn't say NOT NULL.
        // However, we should try to link if possible, but for now we follow the "guest" like flow or assume public.
        // Wait, the prompt implies "when a user places an order".
        // Let's just insert into 'orders'. 
        // We will store customer details in the columns: full_name, email, phone, shipping_address.

        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                full_name: userDetails.full_name,
                email: userDetails.email,
                phone: userDetails.phone,
                shipping_address: userDetails.address,
                status: 'pending', // Initial status
                total: total,
                // user_id: session?.user?.id // Optional: if we had auth context here.
            })
            .select()
            .single();

        if (orderError) {
            console.error("Order Creation Error:", orderError);
            return { success: false, message: "Failed to create order." };
        }

        const orderId = order.id;

        // 2. Create Order Items
        const orderItems = items.map(item => ({
            order_id: orderId,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) {
            console.error("Order Items Error:", itemsError);
            // Verify if we should rollback order? Supabase doesn't support transactions via JS client easily yet without RPC.
            // For MVP, we log and return error.
            return { success: false, message: "Failed to save order items." };
        }

        // 3. Send Admin Email
        await resend.emails.send({
            from: 'Outboards Orders <support@boatsoutboardmotorsandpartsforsale.com>',
            to: ['support@boatsoutboardmotorsandpartsforsale.com'],
            subject: `New Order Received: #${orderId.slice(0, 8)}`,
            text: `
New Order Received!

Customer: ${userDetails.full_name}
Email: ${userDetails.email}
Total: $${total.toLocaleString()}

Items:
${items.map(i => `- ${i.title} x${i.quantity} ($${i.price})`).join('\n')}

Shipping Address:
${userDetails.address}
            `
        });

        // 4. Send User Confirmation Email
        await resend.emails.send({
            from: 'Outboards Sales <support@boatsoutboardmotorsandpartsforsale.com>',
            to: [userDetails.email],
            subject: `Order Confirmation #${orderId.slice(0, 8)}`,
            text: `
Hi ${userDetails.full_name},

Thank you for your order! We have received it and will begin processing shortly.
You will receive another email with the next steps regarding shipping or pickup.

Order Summary:
Total: $${total.toLocaleString()}

Items:
${items.map(i => `- ${i.title} x${i.quantity} ($${i.price})`).join('\n')}

If you have any questions, reply to this email.

Best regards,
Outboards Team
            `
        });

        return { success: true, message: "Order placed successfully!" };

    } catch (e) {
        console.error("Checkout Error:", e);
        return { success: false, message: "An unexpected error occurred processing your order." };
    }
}
