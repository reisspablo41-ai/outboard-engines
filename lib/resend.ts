import { Resend } from 'resend';

// Check if key exists to avoid runtime errors, though ideally validEnv should handle this
const resendKey = process.env.RESEND_KEY;

if (!resendKey) {
    console.warn("Missing RESEND_KEY environment variable. Emails will not send.");
}

export const resend = new Resend(resendKey);
