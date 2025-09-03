import { useState, useEffect } from 'react'
import client, { getAllPosts } from '../lib/sanity'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const data = await client.fetch(getAllPosts)
        setPosts(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}

export function usePost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    async function fetchPost() {
      try {
        setLoading(true)
        const query = `*[_type == "blog" && slug.current == $slug][0] {
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
        const data = await client.fetch(query, { slug })
        setPost(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return { post, loading, error }
}
