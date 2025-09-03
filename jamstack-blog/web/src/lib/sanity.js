import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export default client

// GROQ queries
export const getAllPosts = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  categories,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
    slug
  }
}`

export const getPostBySlug = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  categories,
  publishedAt,
  body,
  author->{
    name,
    image,
    bio,
    slug
  }
}`

export const getAllPostSlugs = `*[_type == "blog"] {
  slug {
    current
  }
}`
