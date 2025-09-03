import Head from 'next/head'
import { motion } from 'framer-motion'
import { useState } from 'react'
import BlogCard from '../components/BlogCard'
import SearchBar from '../components/SearchBar'
import SubscriptionForm from '../components/SubscriptionForm'
import client, { getAllPosts } from '../lib/sanity'

export default function Home({ posts }) {
  const [searchResults, setSearchResults] = useState(null)

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  const displayPosts = searchResults !== null ? searchResults : posts

  return (
    <div>
      <Head>
        <title>AI-Powered Blog</title>
        <meta name="description" content="A modern blog with AI-powered search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome to AI-Powered Blog
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover insights with intelligent search powered by AI
          </p>
          <SearchBar onSearchResults={handleSearchResults} />
        </div>

        <div className="mb-12">
          <SubscriptionForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <BlogCard key={post.slug.current} post={post} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await client.fetch(getAllPosts)
  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}
