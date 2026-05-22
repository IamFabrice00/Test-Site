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

  const { name, email, subject, message, language, site_name } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Test Site Lab <onboarding@resend.dev>',
      to: ['logonfabrice@gmail.com'], // Verified email
      subject: `${site_name} - New Contact Form: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h1 style="color: #6366f1; font-size: 24px; margin-bottom: 20px;">Test Site Lab - New Contact Message</h1>
          <p style="font-size: 16px; line-height: 1.5;">You received a new message from the contact form on <strong>${site_name}</strong>:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 8px 0;">${subject || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Language:</td>
              <td style="padding: 8px 0; text-transform: uppercase;">${language}</td>
            </tr>
          </table>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #6366f1; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap; font-style: italic; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b; text-align: center;">© ${new Date().getFullYear()} Test Site Lab. Managed by Antigravity.</p>
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
