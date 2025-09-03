import client, { getAllPosts } from '../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { query } = req.body

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query is required' })
  }

  try {
    // Fetch all posts from Sanity
    const posts = await client.fetch(getAllPosts)

    // Simple AI-like semantic search
    const searchTerms = query.toLowerCase().split(' ')
    const results = posts.filter(post => {
      const searchableText = `${post.title} ${post.excerpt || ''} ${post.categories?.join(' ') || ''}`.toLowerCase()

      // Check if all search terms are present (AND logic for better relevance)
      return searchTerms.every(term => searchableText.includes(term))
    })

    // Sort by relevance (number of matching terms)
    results.sort((a, b) => {
      const aMatches = searchTerms.filter(term =>
        `${a.title} ${a.excerpt || ''} ${a.categories?.join(' ') || ''}`.toLowerCase().includes(term)
      ).length
      const bMatches = searchTerms.filter(term =>
        `${b.title} ${b.excerpt || ''} ${b.categories?.join(' ') || ''}`.toLowerCase().includes(term)
      ).length
      return bMatches - aMatches
    })

    res.status(200).json({ posts: results })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
