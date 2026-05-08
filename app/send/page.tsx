'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CLINICS = [
  { code: 'BORSE',   short: 'Borse' },
  { code: 'BAVDHAN', short: 'Bavdhan' },
  { code: 'WAKAD',   short: 'Wakad' },
  { code: 'PS',      short: 'Pimple Saudagar' },
  { code: 'BANER',   short: 'Baner' },
  { code: 'PASHAN',  short: 'Pashan' },
  { code: 'SVHA',    short: 'SVH Aundh' },
  { code: 'SVHW',    short: 'SVH Wakad' },
];

export default function SendPage() {
  const router             = useRouter();
  const [clinic, setClinic]     = useState('');
  const [mobile, setMobile]     = useState('');
  const [sending, setSending]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('grr_authed') !== '1') {
      router.replace('/');
    }
  }, [router]);

  const handleSend = async () => {
    const cleaned = mobile.replace(/\D/g, '');
    if (cleaned.length !== 10) { setError('Enter a valid 10-digit mobile number.'); return; }
    if (!clinic) { setError('Please select a clinic.'); return; }

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

          <label className="field-label">
            Patient Mobile Number
            <input
              className="field-input"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={mobile}
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
