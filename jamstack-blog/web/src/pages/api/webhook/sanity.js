import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: false, // Use false for webhooks to get latest data
  token: process.env.SANITY_AUTH_TOKEN, // Need auth token for webhooks
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Verify webhook signature if needed
  // For now, assume it's from Sanity

  const { _type, _id, operation } = req.body

  if (_type === 'blog' && operation === 'create') {
    try {
      // Fetch the new blog post
      const post = await sanityClient.fetch(`*[_type == "blog" && _id == $id][0]`, { id: _id })

      if (post) {
        // Send email to Mailchimp audience
        await sendNewsletterEmail(post)
      }

      res.status(200).json({ message: 'Webhook processed' })
    } catch (error) {
      console.error('Error processing webhook:', error)
      res.status(500).json({ message: 'Error processing webhook' })
    }
  } else {
    res.status(200).json({ message: 'No action needed' })
  }
}

async function sendNewsletterEmail(post) {
  // Create a campaign in Mailchimp
  const campaignData = {
    type: 'regular',
    recipients: {
      list_id: process.env.MAILCHIMP_LIST_ID,
    },
    settings: {
      subject_line: `New Blog Post: ${post.title}`,
      title: `New Post: ${post.title}`,
      from_name: 'Your Blog Name',
      reply_to: 'noreply@yourblog.com',
    },
    content: {
      html: generateEmailHTML(post),
    },
  }

  const campaignResponse = await fetch(`https://us4.api.mailchimp.com/3.0/campaigns`, {
    method: 'POST',
    headers: {
      'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaignData),
  })

  if (campaignResponse.ok) {
    const campaign = await campaignResponse.json()
    // Send the campaign
    await fetch(`https://us4.api.mailchimp.com/3.0/campaigns/${campaign.id}/actions/send`, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
      },
    })
  } else {
    console.error('Error creating campaign:', await campaignResponse.text())
  }
}

function generateEmailHTML(post) {
  return `
    <h1>${post.title}</h1>
    <p>${post.excerpt}</p>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug.current}">Read More</a>
  `
}
