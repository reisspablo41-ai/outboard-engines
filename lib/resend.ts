import { Resend } from 'resend';

// Check if key exists to avoid runtime errors, though ideally validEnv should handle this
const resendKey = process.env.resend_key || process.env.RESEND_KEY;

if (!resendKey) {
    console.warn("⚠️ [Resend] Missing RESEND_KEY or resend_key environment variable. Emails will not send.");
} else {
    console.log(`✅ [Resend] API Key found (length: ${resendKey.length})`);
}

export const resend = new Resend(resendKey || "re_fallback_123");
