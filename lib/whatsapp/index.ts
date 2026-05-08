import type { SendParams, WhatsAppSender } from './types';
import { sendViaTwilio } from './twilio';

const PROVIDERS: Record<string, WhatsAppSender> = {
  twilio: sendViaTwilio,
};

export async function sendReviewLink(params: SendParams) {
  const provider = process.env.WHATSAPP_PROVIDER ?? 'twilio';
  const sender   = PROVIDERS[provider];
  if (!sender) throw new Error(`Unknown WHATSAPP_PROVIDER: ${provider}`);
  await sender(params);
}
