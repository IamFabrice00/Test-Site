import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is missing in environment variables.');
    return res.status(500).json({ error: 'Mail service is not configured on Vercel' });
  }

  const resend = new Resend(apiKey);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, language, site_name } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Test Site Lab <onboarding@resend.dev>',
      to: ['logonfabrice@gmail.com'], // Verified email
      subject: site_name + ' - New Subscription Request',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
          <h1 style="color: #6366f1;">Test Site Lab - Newsletter</h1>
          <p>A new user has subscribed to the newsletter:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Language:</strong> ${language}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">© 2024 Test Site Lab</p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
