# InsightSpark Blog

A modern blog built with React, TypeScript, and Sanity CMS.

## Features

- 🎨 Modern, responsive design built with Tailwind CSS
- 📝 Content management with Sanity CMS
- 🔍 Search functionality
- 📊 Admin dashboard for content overview
- 🎯 Category-based content organization
- ⚡ Fast loading with Vite

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn/UI, Radix UI
- **Styling**: Tailwind CSS
- **CMS**: Sanity CMS
- **State Management**: TanStack Query
- **Routing**: React Router

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Sanity CMS

1. Create a new Sanity project at [sanity.io](https://www.sanity.io/)
2. Copy `.env.example` to `.env` and fill in your Sanity project details:

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_TOKEN=your_sanity_token_here
```

### 3. Set up Sanity Studio

You'll need to create the following schemas in your Sanity project:

#### Post Schema
```javascript
{
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    },
  ],
}
```

#### Category Schema
```javascript
{
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
```

#### Author Schema
```javascript
{
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Access Admin Dashboard

Visit `/admin` to access the admin dashboard. From there you can:
- View content overview
- Open Sanity Studio to create/edit posts
- Manage categories
- View analytics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  components/          # Reusable UI components
    ui/               # Shadcn/UI components
  lib/                # Utilities and configurations
    sanity.ts         # Sanity client and data fetching
  pages/              # Page components
  hooks/              # Custom React hooks
```

## Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Make sure to set environment variables in your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request