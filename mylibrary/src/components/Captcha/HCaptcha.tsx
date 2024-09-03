"use client";

import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const MyHcaptcha = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || '';

  if (!SITEKEY) {
    return <p>Error: hCaptcha sitekey is not defined.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Please complete the captcha');
      return;
    }

    const response = await fetch('/api/verify-hcaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (data.success) {
      const modal = document.getElementById('success_modal') as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    } else {
      setError('Captcha verification failed.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* hCaptcha Component */}
        <HCaptcha
          sitekey={SITEKEY}
          onVerify={(token) => setToken(token)}
          onError={(err) => setError('Captcha error: ' + err)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn">Verify Captcha</button>
      </form>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Captcha Verified!</h3>
          <p className="py-4">Your captcha verification was successful.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyHcaptcha;
