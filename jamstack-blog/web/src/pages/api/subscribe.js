export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  try {
    const response = await fetch(`https://us4.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    })

    if (response.ok) {
      res.status(200).json({ message: 'Successfully subscribed to newsletter' })
    } else {
      const errorData = await response.json()
      console.error('Mailchimp error:', errorData)
      res.status(500).json({ message: 'Failed to subscribe to newsletter' })
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    res.status(500).json({ message: 'Failed to subscribe to newsletter' })
  }
}
