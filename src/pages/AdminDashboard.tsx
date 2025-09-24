import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Plus,
  Edit3,
  Users,
  FileText,
  TrendingUp,
  Search,
  Filter,
  Settings,
  BarChart3,
  PenTool,
  Image,
  Tag,
  Calendar,
  ExternalLink,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getPosts, getCategories } from '@/lib/sanity'
import { formatDistanceToNow } from 'date-fns'

export const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const publishedCount = posts.length
  const totalViews = posts.length * 120 // Mock view count

  const openSanityStudio = () => {
    window.open('https://your-project-id.sanity.studio', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your blog content and settings
            </p>
          </div>
          <Button onClick={openSanityStudio} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Open Sanity Studio
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
                <Tag className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">{publishedCount}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>
                      Manage your blog posts in Sanity CMS
                    </CardDescription>
                  </div>
                  <Button onClick={openSanityStudio} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Search */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                {/* Posts Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            <div className="text-muted-foreground">
                              {searchTerm ? 'No posts found matching your search.' : 'No posts yet. Create your first post in Sanity!'}
                            </div>
                            {!searchTerm && (
                              <Button
                                variant="outline"
                                className="mt-4 gap-2"
                                onClick={openSanityStudio}
                              >
                                <Plus className="h-4 w-4" />
                                Create Post
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPosts.map((post) => (
                          <TableRow key={post._id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold">{post.title}</div>
                                {post.excerpt && (
                                  <div className="text-sm text-muted-foreground line-clamp-1">
                                    {post.excerpt}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {post.categories?.[0] ? (
                                <Badge variant="secondary">
                                  {post.categories[0].title}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground">Uncategorized</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {post.author?.name || 'Unknown Author'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {post.publishedAt
                                  ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
                                  : 'Draft'
                                }
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={openSanityStudio}>
                                    <Edit3 className="mr-2 h-4 w-4" />
                                    Edit in Sanity
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>
                      Manage your blog categories
                    </CardDescription>
                  </div>
                  <Button onClick={openSanityStudio} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => (
                    <Card key={category._id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {posts.filter(p => p.categories?.some(c => c._id === category._id)).length} posts
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={openSanityStudio}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {categories.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No categories yet. Create your first category in Sanity!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Content Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Posts</span>
                      <span className="font-semibold">{posts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Categories</span>
                      <span className="font-semibold">{categories.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Authors</span>
                      <span className="font-semibold">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Popular Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.slice(0, 5).map((category) => {
                      const postCount = posts.filter(p =>
                        p.categories?.some(c => c._id === category._id)
                      ).length
                      return (
                        <div key={category._id} className="flex justify-between">
                          <span>{category.title}</span>
                          <Badge variant="secondary">{postCount}</Badge>
                        </div>
                      )
                    })}
                    {categories.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No categories available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    CMS Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={openSanityStudio} className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Sanity Studio
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Configure Sanity
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={openSanityStudio} variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Post
                  </Button>
                  <Button onClick={openSanityStudio} variant="outline" className="w-full gap-2">
                    <Tag className="h-4 w-4" />
                    Manage Categories
                  </Button>
                  <Button onClick={openSanityStudio} variant="outline" className="w-full gap-2">
                    <Image className="h-4 w-4" />
                    Media Library
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}