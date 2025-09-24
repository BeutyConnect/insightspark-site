import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Calendar, Clock, User, Share2, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { BlogCard } from '@/components/BlogCard'
import { getPostBySlug, getPosts } from '@/lib/sanity'
import { formatDistanceToNow } from 'date-fns'

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  })

  const { data: allPosts = [] } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getPosts,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const relatedPosts = allPosts.filter(p => p._id !== post._id).slice(0, 3)
  
  const formattedDate = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : formatDistanceToNow(new Date(post._createdAt), { addSuffix: true })

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container-blog py-8">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="pb-12">
        <div className="container-blog">
          <div className="mx-auto max-w-4xl">
            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-8">
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {post.category && (
                <Badge 
                  variant="secondary"
                  style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                >
                  {post.category.name}
                </Badge>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {formattedDate}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {post.reading_time || 5} min read
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-8">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Author & Share */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author?.avatar_url} />
                  <AvatarFallback>
                    {post.author?.display_name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {post.author?.display_name || 'Anonymous Author'}
                  </p>
                  {post.author?.bio && (
                    <p className="text-sm text-muted-foreground">
                      {post.author.bio.slice(0, 60)}...
                    </p>
                  )}
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container-blog">
          <div className="mx-auto max-w-3xl">
            <article className="prose-blog">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags */}
            {post.post_tags && post.post_tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground mr-2">Tags:</span>
                  {post.post_tags.map(({ tag }) => (
                    <Badge key={tag.id} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Author Bio */}
      {post.author && (
        <section className="py-16 bg-muted/30">
          <div className="container-blog">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-6 p-8 bg-card rounded-2xl border">
                <Avatar className="h-20 w-20 mx-auto sm:mx-0">
                  <AvatarImage src={post.author.avatar_url} />
                  <AvatarFallback className="text-lg">
                    {post.author.display_name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {post.author.display_name || 'Anonymous Author'}
                  </h3>
                  {post.author.bio && (
                    <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                  )}
                  <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                    {post.author.website && (
                      <a
                        href={post.author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Website
                      </a>
                    )}
                    {post.author.twitter && (
                      <a
                        href={`https://twitter.com/${post.author.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container-blog">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-3xl font-heading font-bold text-center mb-12">
                Related Articles
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}