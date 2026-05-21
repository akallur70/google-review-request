import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { id, event } = await request.json();
    if (!id || !['visited', 'clicked'].includes(event)) {
      return NextResponse.json({ ok: true });
    }

    const field = event === 'visited' ? 'link_visited_at' : 'link_clicked_at';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('rev_review_requests') as any)
      .update({ [field]: new Date().toISOString() })
      .eq('id', id);

  } catch {
    // never fail — tracking must not break the patient experience
  }

  return NextResponse.json({ ok: true });
}
