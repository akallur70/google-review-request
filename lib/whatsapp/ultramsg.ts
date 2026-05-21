import type { SendParams } from './types';

export async function sendViaUltraMsg({ clinicName, reviewUrl, mobile }: SendParams) {
  const instanceId = process.env.ULTRAMSG_INSTANCE_ID!;
  const token      = process.env.ULTRAMSG_TOKEN!;

  const body =
    `Thank you for visiting ${clinicName}! 😊\n\n` +
    `We'd love to hear your feedback. Please share a Google Review here:\n${reviewUrl}\n\n` +
    `It takes less than a minute and means a lot to us!`;

  const res = await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ token, to: `+91${mobile}`, body }).toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`UltraMsg error ${res.status}: ${text}`);
  }
}
