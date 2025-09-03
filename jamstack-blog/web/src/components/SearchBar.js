import { useState } from 'react'
import { motion } from 'framer-motion'
import { aiSearchPosts } from '../lib/aiSearch'

export default function SearchBar({ onSearchResults }) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const results = await aiSearchPosts(query)
      onSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
      onSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">AI-Powered Search</h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything about our blog posts..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Powered by AI for semantic search
      </p>
    </motion.div>
  )
}
