const { Resend } = require('resend');

const resend = new Resend('re_BPNeWwU2_FYAqX8A6kv153CkrJGZQag6G');

async function testResend() {
  console.log('Starting Test Site Lab Resend test...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test Site Lab <onboarding@resend.dev>',
      to: ['logonfabrice@gmail.com'],
      subject: 'Test Site Lab - Newsletter Fix Confirmation',
      html: '<h1>Newsletter Fix Confirmed</h1><p>This is a test for <strong>logonfabrice@gmail.com</strong>. The newsletter in Test Site Lab is now using Resend and is working correctly.</p>',
    });

    if (error) {
      console.error('Resend Error:', error);
    } else {
      console.log('Email sent successfully from Test Site Lab!', data);
    }
  } catch (err) {
    console.error('Test Script Error:', err);
  }
}

testResend();
