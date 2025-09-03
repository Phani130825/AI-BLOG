import Head from 'next/head'
import { motion } from 'framer-motion'
import { getPostBySlug, getAllPostSlugs } from '../../lib/sanity'
import { urlFor } from '../../lib/sanity'
import ReactMarkdown from 'react-markdown'

export default function BlogPost({ post }) {
  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div>
      <Head>
        <title>{post.title} | AI-Powered Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span>By {post.author?.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(800).height(400).url()}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </motion.article>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = await getAllPostSlugs()
  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)
  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
