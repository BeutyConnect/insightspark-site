import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getPosts, getCategories } from '@/lib/sanity'

export const Footer = () => {
  const { data: recentPosts } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: getPosts,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container-blog">
        <div className="grid gap-8 py-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-xl font-heading font-bold text-gradient">
                CodeCraft Weekly
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sharing insights on technology, design, and modern development practices. 
              Join our community of creative minds.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@blogcraft.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold font-heading">Recent Posts</h3>
            <ul className="space-y-3">
              {recentPosts?.slice(0, 3).map((post) => (
                <li key={post._id}>
                  <Link
                    to={`/post/${post.slug.current}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold font-heading">Categories</h3>
            <ul className="space-y-3">
              {categories?.slice(0, 4).map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/category/${category.slug.current}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold font-heading">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeCraft Weekly. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using React and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}