import Head from 'next/head'
import { motion } from 'framer-motion'
import { useState } from 'react'
import BlogCard from '../../components/BlogCard'
import SearchBar from '../../components/SearchBar'
import client, { getAllPosts } from '../../lib/sanity'

export default function Blog({ posts }) {
  const [searchResults, setSearchResults] = useState(null)

  const handleSearchResults = (results) => {
    setSearchResults(results)
  }

  const displayPosts = searchResults !== null ? searchResults : posts

  return (
    <div>
      <Head>
        <title>Blog - AI-Powered Blog</title>
        <meta name="description" content="All blog posts" />
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
            Blog Posts
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover all our latest articles
          </p>
          <SearchBar onSearchResults={handleSearchResults} />
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
