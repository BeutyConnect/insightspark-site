-- Enable RLS
ALTER SCHEMA public ENABLE ROW LEVEL SECURITY;

-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  twitter TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  author_id UUID NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction table for post tags
CREATE TABLE public.post_tags (
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for categories (public read, admin write)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage categories" 
ON public.categories FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for tags (public read, authenticated write)
CREATE POLICY "Tags are viewable by everyone" 
ON public.tags FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage tags" 
ON public.tags FOR ALL USING (auth.uid() IS NOT NULL);

-- Create policies for posts
CREATE POLICY "Published posts are viewable by everyone" 
ON public.posts FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can manage their own posts" 
ON public.posts FOR ALL USING (auth.uid() = author_id);

-- Create policies for post_tags
CREATE POLICY "Post tags are viewable by everyone" 
ON public.post_tags FOR SELECT USING (true);

CREATE POLICY "Authors can manage their post tags" 
ON public.post_tags FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.posts 
    WHERE posts.id = post_tags.post_id 
    AND posts.author_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample categories
INSERT INTO public.categories (name, slug, description, color) VALUES
('Technology', 'technology', 'Latest in tech trends and innovations', '#3B82F6'),
('Design', 'design', 'UI/UX and creative design insights', '#8B5CF6'),
('Business', 'business', 'Entrepreneurship and business strategy', '#10B981'),
('Lifestyle', 'lifestyle', 'Life tips and personal development', '#F59E0B');

-- Insert some sample tags
INSERT INTO public.tags (name, slug) VALUES
('React', 'react'),
('JavaScript', 'javascript'),
('UI/UX', 'ui-ux'),
('Startup', 'startup'),
('Productivity', 'productivity'),
('Web Development', 'web-development');