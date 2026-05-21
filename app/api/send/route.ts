import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';
import { sendReviewLink } from '../../../lib/whatsapp';

const CLINIC_NAMES: Record<string, string> = {
  BORSE:   'Saishree Vitalife Borse',
  BAVDHAN: 'Saishree Vitalife Bavdhan',
  WAKAD:   'Saishree Vitalife Wakad',
  PS:      'Saishree Vitalife Pimple Saudagar',
  BANER:   'Saishree Vitalife Baner',
  PASHAN:  'Saishree Vitalife Pashan',
  SVHA:    'Saishree Vitalife Aundh',
  SVHW:    'Saishree Vitalife Hospital Wakad',
};

export async function POST(request: Request) {
  try {
    const { clinic, mobile } = await request.json();

    if (!clinic || !mobile) {
      return NextResponse.json({ error: 'clinic and mobile are required' }, { status: 400 });
    }

    const reviewUrl = process.env[`CLINIC_${clinic}_REVIEW`];
    if (!reviewUrl) {
      return NextResponse.json({ error: `No review URL configured for clinic: ${clinic}` }, { status: 400 });
    }

    const clinicName = CLINIC_NAMES[clinic] ?? clinic;

    await sendReviewLink({ clinic, clinicName, reviewUrl, mobile });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('review_requests') as any).insert([{
      clinic,
      mobile,
      sent_from: process.env.ULTRAMSG_WHATSAPP_NUMBER ?? null,
      sent_at:   new Date().toISOString(),
    }]);

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
