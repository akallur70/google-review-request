'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PinPage() {
  const [pin, setPin]     = useState('');
  const [error, setError] = useState(false);
  const router            = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      sessionStorage.setItem('grr_authed', '1');
      router.push('/send');
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="pin-page">
      <img src="/logo.svg" alt="Saishree Vitalife" className="pin-logo" />
      <div className="pin-card">
        <div className="pin-title">Enter Staff PIN to continue</div>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            className={`pin-input${error ? ' error' : ''}`}
            type="password"
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={pin}
            autoFocus
            onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setError(false); }}
          />
          {error && <div className="pin-error">Incorrect PIN. Please try again.</div>}
          <button type="submit" className="send-btn" disabled={pin.length !== 4}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
