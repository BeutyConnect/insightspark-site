import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Users, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BlogCard } from '@/components/BlogCard'
import { Badge } from '@/components/ui/badge'
import { getPosts, getCategories } from '@/lib/sanity'
import heroImage from '@/assets/hero-image.jpg'

export const HomePage = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Hero background"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
          </div>
          
          <div className="relative container-blog py-24 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Craft Your
                <span className="block text-accent-light">Digital Story</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-xl">
                Discover insights on technology, design, and innovation. Join our community 
                of creators, thinkers, and digital craftspeople.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" className="bg-accent hover:bg-accent-muted text-accent-foreground">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-blog">
          <div className="grid gap-8 sm:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold">{posts.length}+</div>
                <p className="text-sm text-muted-foreground">Articles Published</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold">10K+</div>
                <p className="text-sm text-muted-foreground">Monthly Readers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold">95%</div>
                <p className="text-sm text-muted-foreground">Reader Satisfaction</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="container-blog">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-heading font-bold sm:text-4xl">Featured Article</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our latest and most impactful piece
              </p>
            </div>
            
            <div className="mx-auto max-w-4xl animate-slide-up">
              <BlogCard post={featuredPost} featured />
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container-blog">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-heading font-bold sm:text-4xl">Explore Topics</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover content that matters to you
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Link key={category._id} to={`/category/${category.slug.current}`}>
                  <Badge
                    variant="secondary"
                    className="px-6 py-3 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {category.title}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="container-blog">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-heading font-bold sm:text-4xl">Latest Articles</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Fresh insights and perspectives
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/blog">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-scale-in">
              {recentPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-blog text-center">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">
            Stay in the Loop
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Get the latest articles and insights delivered directly to your inbox
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="bg-accent hover:bg-accent-muted text-accent-foreground">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}