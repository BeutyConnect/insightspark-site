import { User, Target, Award, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container-blog">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-heading font-bold sm:text-5xl">
              About <span className="text-gradient">CodeCraft Weekly</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              We're passionate about sharing knowledge, insights, and stories that inspire
              and educate. Our mission is to create meaningful content that makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container-blog">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize knowledge by creating high-quality, accessible content that
                  empowers individuals to grow, learn, and succeed in their personal and
                  professional endeavors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-heading">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the go-to platform for thoughtful, well-researched content that
                  bridges the gap between complex topics and practical understanding for
                  curious minds worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container-blog">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize depth and accuracy over quantity, ensuring every piece meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold mb-2">Reader-Centric</h3>
                <p className="text-sm text-muted-foreground">
                  Every article is crafted with our readers in mind, focusing on practical value and clarity.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We stay ahead of trends and explore emerging topics to keep our content fresh and relevant.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold mb-2">Community</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in fostering a supportive community of learners and knowledge sharers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-16">
        <div className="container-blog">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold sm:text-4xl">What We Cover</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Diverse topics for curious minds
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Technology',
              'Web Development',
              'Design',
              'Productivity',
              'Entrepreneurship',
              'Digital Marketing',
              'AI & Machine Learning',
              'Career Growth',
              'Innovation',
              'Best Practices'
            ].map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-blog text-center">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">
            Join Our Journey
          </h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Whether you're here to learn, share, or connect, we're excited to have you as part
            of our growing community. Let's explore, discover, and grow together.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-muted text-accent-foreground rounded-lg font-medium transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/20"
            >
              Explore Articles
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}