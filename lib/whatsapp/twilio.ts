import twilio from 'twilio';
import type { SendParams } from './types';

export async function sendViaTwilio({ clinicName, reviewUrl, mobile }: SendParams) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  const body =
    `Thank you for visiting ${clinicName}! 😊\n\n` +
    `We'd love to hear your feedback. Please share a Google Review here:\n${reviewUrl}\n\n` +
    `It takes less than a minute and means a lot to us!`;

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM!,
    to:   `whatsapp:+91${mobile}`,
    body,
  });
}
