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

const BASE_URL = 'https://review.svh.hospital';

export async function POST(request: Request) {
  try {
    const { clinic, mobile } = await request.json();

    if (!clinic || !mobile) {
      return NextResponse.json({ error: 'clinic and mobile are required' }, { status: 400 });
    }

    if (!process.env[`CLINIC_${clinic}_REVIEW`]) {
      return NextResponse.json({ error: `No review URL configured for clinic: ${clinic}` }, { status: 400 });
    }

    const clinicName = CLINIC_NAMES[clinic] ?? clinic;

    // Insert first to get the ID for click tracking
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: inserted } = await (supabase.from('rev_review_requests') as any)
      .insert([{
        clinic,
        mobile,
        sent_from: process.env.ULTRAMSG_WHATSAPP_NUMBER ?? null,
        sent_at:   new Date().toISOString(),
      }])
      .select('id')
      .single();

    const landingUrl = inserted?.id
      ? `${BASE_URL}/r/${clinic}?t=${inserted.id}`
      : `${BASE_URL}/r/${clinic}`;

    await sendReviewLink({ clinic, clinicName, reviewUrl: landingUrl, mobile });

    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
