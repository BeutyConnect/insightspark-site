import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_TOKEN,
})

export type Post = {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  content: any[]
  excerpt?: string
  mainImage?: {
    asset: {
      _ref: string
      url: string
    }
  }
  publishedAt: string
  categories: Category[]
  author: Author
  _createdAt: string
  _updatedAt: string
}

export type Category = {
  _id: string
  _type: 'category'
  title: string
  slug: { current: string }
  description?: string
}

export type Author = {
  _id: string
  _type: 'author'
  name: string
  slug: { current: string }
  image?: {
    asset: {
      _ref: string
      url: string
    }
  }
  bio?: string
}

export const getPosts = async (): Promise<Post[]> => {
  const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset-> {
        _ref,
        url
      }
    },
    publishedAt,
    categories[]-> {
      _id,
      title,
      slug
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset-> {
          _ref,
          url
        }
      }
    },
    _createdAt,
    _updatedAt
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    mainImage {
      asset-> {
        _ref,
        url
      }
    },
    publishedAt,
    categories[]-> {
      _id,
      title,
      slug
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset-> {
          _ref,
          url
        }
      },
      bio
    },
    _createdAt,
    _updatedAt
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export const getCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}