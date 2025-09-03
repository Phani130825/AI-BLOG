import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '../lib/sanity'

export default function BlogCard({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {post.mainImage && (
        <div className="relative h-48">
          <Image
            src={urlFor(post.mainImage).width(400).height(200).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center mb-2">
          {post.categories && post.categories.map((category, index) => (
            <span
              key={index}
              className="bg-primary text-white text-xs px-2 py-1 rounded mr-2"
            >
              {category}
            </span>
          ))}
          <span className="text-gray-500 text-sm">
            {new Date(post.publishedAt).toLocaleDateString('en-US')}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-2">
          <Link href={`/blog/${post.slug.current}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4">
          {post.excerpt || 'Read more about this post...'}
        </p>
        {post.author && (
          <div className="flex items-center">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(32).height(32).url()}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            )}
            <span className="text-sm text-gray-500">
              By {post.author.name}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )
}
