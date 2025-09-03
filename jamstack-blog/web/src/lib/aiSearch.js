import client, { getAllPosts } from './sanity'

// Mock AI search function - replace with actual AI API integration
export async function searchPosts(query) {
  try {
    // Get all posts from Sanity
    const posts = await client.fetch(getAllPosts)

    // Simple text-based search (replace with AI semantic search)
    const filteredPosts = posts.filter(post => {
      const searchText = `${post.title} ${post.excerpt || ''} ${post.categories?.join(' ') || ''}`.toLowerCase()
      return searchText.includes(query.toLowerCase())
    })

    return filteredPosts
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

// Advanced AI search function (integrate with OpenAI or Hugging Face)
export async function aiSearchPosts(query) {
  try {
    // This is a placeholder for AI integration
    // You would typically send the query to an AI service like OpenAI
    // and get semantic search results

    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error('AI search failed')
    }

    const results = await response.json()
    return results.posts || []
  } catch (error) {
    console.error('AI search error:', error)
    // Fallback to simple search
    return searchPosts(query)
  }
}

// Function to get embeddings for semantic search
export async function getEmbeddings(text) {
  // Placeholder for embedding generation
  // Integrate with OpenAI embeddings API or similar
  return []
}

// Function to calculate similarity between embeddings
export function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}
