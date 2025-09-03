import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // This should be an App Password, not regular password
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'admin@example.com', // Email where you want to receive contact form submissions
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    console.log('Contact form email sent successfully:', { name, email })
    res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error sending contact email:', error)
    res.status(500).json({ message: 'Failed to send message' })
  }
}
