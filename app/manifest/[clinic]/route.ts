const CLINIC_SHORT: Record<string, string> = {
  SVHW:    'SVHWakad',
  SVHA:    'SVHAundh',
  BORSE:   'Borse',
  BAVDHAN: 'Bavdhan',
  WAKAD:   'Wakad',
  PS:      'PS Clinic',
  BANER:   'Baner',
  PASHAN:  'Pashan',
};

type Params = { params: Promise<{ clinic: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { clinic: raw } = await params;
  const clinic    = raw.toUpperCase();
  const shortName = CLINIC_SHORT[clinic] ?? clinic;

  const manifest = {
    name:             `SVH Review — ${shortName}`,
    short_name:       shortName,
    description:      'Send a Google Review request to a patient',
    start_url:        `/send?clinic=${clinic}`,
    display:          'standalone',
    background_color: '#ffffff',
    theme_color:      '#f47216',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/icon', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
