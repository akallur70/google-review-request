import { ImageResponse } from 'next/og';

export const size        = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#f47216',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <div style={{ color: '#fff', fontSize: 80, fontWeight: 900, lineHeight: 1 }}>
          SVH
        </div>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
          Review
        </div>
      </div>
    ),
    { ...size },
  );
}
