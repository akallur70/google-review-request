'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CLINICS: { code: string; short: string; label: string }[] = [
  { code: 'SVHW',    short: 'SVH Wakad',         label: 'Saishree Vitalife Hospital Wakad' },
  { code: 'SVHA',    short: 'SVH Aundh',          label: 'Saishree Vitalife Aundh' },
  { code: 'BORSE',   short: 'Borse',              label: 'Saishree Vitalife Borse' },
  { code: 'BAVDHAN', short: 'Bavdhan',            label: 'Saishree Vitalife Bavdhan' },
  { code: 'WAKAD',   short: 'Wakad Clinic',       label: 'Saishree Vitalife Wakad' },
  { code: 'PS',      short: 'Pimple Saudagar',    label: 'Saishree Vitalife Pimple Saudagar' },
  { code: 'BANER',   short: 'Baner',              label: 'Saishree Vitalife Baner' },
  { code: 'PASHAN',  short: 'Pashan',             label: 'Saishree Vitalife Pashan' },
];

function SendForm() {
  const router        = useRouter();
  const params        = useSearchParams();
  const clinicParam   = (params.get('clinic') ?? '').toUpperCase();
  const preselected   = CLINICS.find(c => c.code === clinicParam) ?? null;

  const [clinic, setClinic]   = useState(preselected?.code ?? '');
  const [mobile, setMobile]   = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    // Only enforce PIN when no clinic is pre-selected via URL
    if (!preselected && sessionStorage.getItem('grr_authed') !== '1') {
      router.replace('/');
    }
  }, [preselected, router]);

  useEffect(() => {
    // Point the manifest at the clinic-specific one so "Add to Home Screen"
    // captures the correct start_url (with ?clinic=XX)
    if (!preselected) return;
    const existing = document.querySelector('link[rel="manifest"]');
    const link = (existing ?? document.createElement('link')) as HTMLLinkElement;
    link.rel  = 'manifest';
    link.href = `/manifest/${preselected.code}`;
    if (!existing) document.head.appendChild(link);
  }, [preselected]);

  const handleSend = async () => {
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length !== 10) { setError('Enter a valid 10-digit mobile number.'); return; }
    if (!clinic)               { setError('Please select a clinic.'); return; }

    setError('');
    setSending(true);
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clinic, mobile: cleaned }),
    });
    setSending(false);

    if (res.ok) {
      setSuccess(true);
      setMobile('');
    } else {
      const d = await res.json();
      setError(d.error || 'Something went wrong. Please try again.');
    }
  };

  const handleAnother = () => {
    setSuccess(false);
    setError('');
  };

  return (
    <div className="send-page">
      <div className="send-header">
        <img src="/logo.svg" alt="Saishree Vitalife" className="send-header-logo" />
        <div className="send-header-title">Google Review Request</div>
      </div>

      {success ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          <div className="success-banner">
            ✅ Review link sent on WhatsApp!
          </div>
          <button className="send-btn" onClick={handleAnother}>
            Send Another
          </button>
        </div>
      ) : (
        <div className="send-card">
          {preselected ? (
            <div style={{
              background: '#f47216',
              color: '#fff',
              borderRadius: 8,
              padding: '12px 16px',
              fontWeight: 700,
              fontSize: 17,
              textAlign: 'center',
              letterSpacing: 0.3,
            }}>
              {preselected.label}
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#333' }}>Select Clinic</div>
              <div className="clinic-grid">
                {CLINICS.map(c => (
                  <div
                    key={c.code}
                    className={`clinic-btn${clinic === c.code ? ' selected' : ''}`}
                    onClick={() => setClinic(c.code)}
                  >
                    {c.short}
                  </div>
                ))}
              </div>
            </>
          )}

          <label className="field-label">
            Patient Mobile Number
            <input
              className="field-input"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={mobile}
              autoFocus
              onChange={e => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }}
            />
            <span className="mobile-hint">Indian number without country code — e.g. 9876543210</span>
          </label>

          {error && <div className="error-banner">{error}</div>}

          <button
            className="send-btn"
            disabled={!clinic || mobile.length !== 10 || sending}
            onClick={handleSend}
          >
            {sending ? 'Sending...' : 'Send Review Link on WhatsApp'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense>
      <SendForm />
    </Suspense>
  );
}
