// Mock data for testing until database types are properly generated
export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  status: 'draft' | 'published' | 'scheduled'
  author_id: string
  category_id?: string
  view_count: number
  reading_time: number
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  published_at?: string
  scheduled_at?: string
  created_at: string
  updated_at: string
  category?: Category
  author?: Profile
  post_tags?: { tag: Tag }[]
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  created_at: string
}

export type Tag = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type Profile = {
  id: string
  user_id: string
  display_name?: string
  bio?: string
  avatar_url?: string
  website?: string
  twitter?: string
  created_at: string
  updated_at: string
}

// Mock categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest in tech trends and innovations',
    color: '#3B82F6',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Design',
    slug: 'design',
    description: 'UI/UX and creative design insights',
    color: '#8B5CF6',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Business',
    slug: 'business',
    description: 'Entrepreneurship and business strategy',
    color: '#10B981',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Life tips and personal development',
    color: '#F59E0B',
    created_at: new Date().toISOString(),
  },
]

// Mock author
export const mockAuthor: Profile = {
  id: '1',
  user_id: '1',
  display_name: 'Alex Johnson',
  bio: 'Full-stack developer and tech enthusiast. Passionate about creating amazing web experiences.',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  website: 'https://alexjohnson.dev',
  twitter: 'alexjohnsondev',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

// Mock posts
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-trends-2024',
    content: `
      <h2>Introduction</h2>
      <p>Web development continues to evolve at a rapid pace. As we move through 2024, several key trends are shaping how we build and interact with web applications.</p>
      
      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing how developers write code. Tools like GitHub Copilot and ChatGPT are becoming integral parts of the development workflow, helping developers write better code faster.</p>
      
      <h2>2. Server-Side Rendering Renaissance</h2>
      <p>With frameworks like Next.js, Nuxt.js, and SvelteKit leading the charge, server-side rendering is making a strong comeback. This approach offers better SEO, faster initial page loads, and improved user experience.</p>
      
      <h2>3. WebAssembly Goes Mainstream</h2>
      <p>WebAssembly (WASM) is no longer just an experimental technology. More applications are leveraging WASM to bring near-native performance to web applications, especially for computationally intensive tasks.</p>
      
      <h2>Conclusion</h2>
      <p>The web development landscape is more exciting than ever. By staying current with these trends, developers can build better, faster, and more engaging web experiences.</p>
    `,
    excerpt: 'Discover the key trends shaping web development in 2024, from AI-powered tools to the resurgence of server-side rendering.',
    featured_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    status: 'published',
    author_id: '1',
    category_id: '1',
    view_count: 1250,
    reading_time: 8,
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: mockCategories[0],
    author: mockAuthor,
    post_tags: [
      { tag: { id: '1', name: 'React', slug: 'react', created_at: new Date().toISOString() } },
      { tag: { id: '2', name: 'JavaScript', slug: 'javascript', created_at: new Date().toISOString() } },
    ],
  },
  {
    id: '2',
    title: 'Building Accessible User Interfaces: A Complete Guide',
    slug: 'building-accessible-user-interfaces-guide',
    content: `
      <h2>Why Accessibility Matters</h2>
      <p>Creating accessible user interfaces isn't just about compliance—it's about creating inclusive experiences for all users. When we design with accessibility in mind, we create better products for everyone.</p>
      
      <h2>Key Principles of Accessible Design</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for accessible design based on four principles:</p>
      
      <ul>
        <li><strong>Perceivable:</strong> Information must be presentable in ways users can perceive</li>
        <li><strong>Operable:</strong> Interface components must be operable by all users</li>
        <li><strong>Understandable:</strong> Information and UI operation must be understandable</li>
        <li><strong>Robust:</strong> Content must be robust enough for assistive technologies</li>
      </ul>
      
      <h2>Practical Implementation Tips</h2>
      <p>Here are some practical ways to improve accessibility in your applications:</p>
      
      <blockquote>
        "Accessibility is not a feature. It's a fundamental aspect of inclusive design that benefits everyone."
      </blockquote>
    `,
    excerpt: 'Learn how to build accessible user interfaces that work for everyone, with practical tips and real-world examples.',
    featured_image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop',
    status: 'published',
    author_id: '1',
    category_id: '2',
    view_count: 890,
    reading_time: 12,
    published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: mockCategories[1],
    author: mockAuthor,
    post_tags: [
      { tag: { id: '3', name: 'UI/UX', slug: 'ui-ux', created_at: new Date().toISOString() } },
      { tag: { id: '4', name: 'Accessibility', slug: 'accessibility', created_at: new Date().toISOString() } },
    ],
  },
  {
    id: '3',
    title: 'Scaling Your Startup: Lessons from the Trenches',
    slug: 'scaling-startup-lessons-from-trenches',
    content: `
      <h2>The Reality of Scaling</h2>
      <p>Scaling a startup is one of the most challenging yet rewarding experiences an entrepreneur can face. It's a journey filled with tough decisions, rapid learning, and constant adaptation.</p>
      
      <h2>Key Lessons Learned</h2>
      <p>After helping scale multiple startups from seed to Series B, here are the most important lessons I've learned:</p>
      
      <h3>1. Culture is Your Foundation</h3>
      <p>As you grow from 10 to 100+ employees, maintaining your company culture becomes increasingly difficult but absolutely critical.</p>
      
      <h3>2. Systems Before Scale</h3>
      <p>Building robust systems and processes before you need them is crucial. Don't wait until you're drowning to implement proper workflows.</p>
    `,
    excerpt: 'Hard-earned lessons from scaling startups, covering culture, systems, and the human side of rapid growth.',
    featured_image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    status: 'published',
    author_id: '1',
    category_id: '3',
    view_count: 2340,
    reading_time: 15,
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: mockCategories[2],
    author: mockAuthor,
    post_tags: [
      { tag: { id: '5', name: 'Startup', slug: 'startup', created_at: new Date().toISOString() } },
      { tag: { id: '6', name: 'Leadership', slug: 'leadership', created_at: new Date().toISOString() } },
    ],
  },
]

// Mock functions
export const getPublishedPosts = async (limit?: number) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const posts = limit ? mockPosts.slice(0, limit) : mockPosts
  return { data: posts, error: null }
}

export const getPostBySlug = async (slug: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const post = mockPosts.find(p => p.slug === slug)
  return { data: post || null, error: post ? null : new Error('Post not found') }
}

export const getCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  return { data: mockCategories, error: null }
}

export const getCurrentUser = async () => {
  // Mock user session - in real app this would check auth
  return null
}

export const signIn = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  // Mock sign in
  return { data: null, error: null }
}

export const signUp = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  // Mock sign up
  return { data: null, error: null }
}

export const signOut = async () => {
  return { error: null }
}

export const getUserPosts = async (userId: string) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  return { data: mockPosts, error: null }
}

export const createPost = async (postData: Partial<Post>) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { data: null, error: null }
}

export const updatePost = async (id: string, postData: Partial<Post>) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { data: null, error: null }
}

export const deletePost = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { error: null }
}