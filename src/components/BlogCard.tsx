import { Link } from 'react-router-dom'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Post } from '@/lib/sanity'
import { formatDistanceToNow } from 'date-fns'

interface BlogCardProps {
  post: Post
  featured?: boolean
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const formattedDate = post.publishedAt
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : formatDistanceToNow(new Date(post._createdAt), { addSuffix: true })

  if (featured) {
    return (
      <Link to={`/post/${post.slug.current}`}>
        <Card className="blog-card overflow-hidden group">
          <div className="aspect-[16/9] overflow-hidden">
            {post.mainImage?.asset?.url ? (
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-4xl font-heading font-bold text-muted-foreground/50">
                  {post.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
          
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-4">
              {post.categories?.[0] && (
                <Badge variant="secondary">
                  {post.categories[0].title}
                </Badge>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {formattedDate}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                5 min read
              </div>
            </div>

            <h2 className="text-2xl font-heading font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author?.image?.asset?.url} />
                  <AvatarFallback>
                    {post.author?.name?.charAt(0) || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {post.author?.name || 'Anonymous'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center text-sm font-medium text-primary group-hover:text-accent transition-colors">
                Read more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={`/post/${post.slug}`}>
      <Card className="blog-card overflow-hidden group h-full">
        <div className="aspect-[4/3] overflow-hidden">
          {post.mainImage?.asset?.url ? (
            <img
              src={post.featured_image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-3xl font-heading font-bold text-muted-foreground/50">
                {post.title.charAt(0)}
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            {post.category && (
              <Badge variant="secondary" style={{ backgroundColor: post.category.color + '20', color: post.category.color }}>
                {post.category.name}
              </Badge>
            )}
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              5 min
            </div>
          </div>

          <h3 className="text-lg font-heading font-semibold mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author?.avatar_url} />
                <AvatarFallback className="text-xs">
                  {post.author?.display_name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs text-muted-foreground">
                {post.author?.name || 'Anonymous'}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {formattedDate}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}