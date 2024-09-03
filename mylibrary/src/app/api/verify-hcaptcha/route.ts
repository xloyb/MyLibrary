import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ success: false, error: 'Captcha token missing' });
  }

  const secretKey = process.env.HCAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    return NextResponse.json({ success: false, error: 'hCaptcha secret key not found' });
  }

  try {
    // Verify the hCaptcha token with hCaptcha's verification API
    const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `response=${token}&secret=${secretKey}`,
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Captcha verification failed' });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'An error occurred during verification' });
  }
}
