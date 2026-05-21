import type { SendParams, WhatsAppSender } from './types';
import { sendViaTwilio }    from './twilio';
import { sendViaUltraMsg }  from './ultramsg';

const PROVIDERS: Record<string, WhatsAppSender> = {
  twilio:   sendViaTwilio,
  ultramsg: sendViaUltraMsg,
};

export async function sendReviewLink(params: SendParams) {
  const provider = process.env.WHATSAPP_PROVIDER ?? 'ultramsg';
  const sender   = PROVIDERS[provider];
  if (!sender) throw new Error(`Unknown WHATSAPP_PROVIDER: ${provider}`);
  await sender(params);
}
