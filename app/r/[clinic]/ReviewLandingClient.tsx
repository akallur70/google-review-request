'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Props {
  clinicName: string;
  reviewUrl:  string;
}

function LandingInner({ clinicName, reviewUrl }: Props) {
  const searchParams = useSearchParams();
  const requestId    = searchParams.get('t');

  useEffect(() => {
    if (!requestId) return;
    fetch('/api/track', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id: requestId, event: 'visited' }),
    }).catch(() => {});
  }, [requestId]);

  const handleClick = () => {
    if (!requestId) return;
    fetch('/api/track', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id: requestId, event: 'clicked' }),
    }).catch(() => {});
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
      background: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <img
        src="/logo.svg"
        alt="Saishree Vitalife"
        style={{ height: 40, marginBottom: 28 }}
      />

      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '32px 24px',
        maxWidth: 380,
        width: '100%',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <div style={{
          background: '#f47216',
          color: '#fff',
          borderRadius: 8,
          padding: '10px 16px',
          fontWeight: 700,
          fontSize: 16,
        }}>
          {clinicName}
        </div>

        <div style={{ fontSize: 42 }}>⭐</div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', marginBottom: 8 }}>
            Thank you for visiting us!
          </div>
          <div style={{ fontSize: 15, color: '#555', lineHeight: 1.5 }}>
            Your feedback helps us improve and helps others find quality care.
            It takes less than a minute.
          </div>
        </div>

        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          style={{
            display: 'block',
            background: '#f47216',
            color: '#fff',
            borderRadius: 10,
            padding: '16px 24px',
            fontWeight: 700,
            fontSize: 17,
            textDecoration: 'none',
            letterSpacing: 0.2,
          }}
        >
          Leave a Google Review
        </a>

        <div style={{ fontSize: 12, color: '#aaa' }}>
          Opens in your browser
        </div>
      </div>
    </div>
  );
}

export default function ReviewLandingClient(props: Props) {
  return (
    <Suspense>
      <LandingInner {...props} />
    </Suspense>
  );
}
