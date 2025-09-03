# AI-Powered Blog with Markdown CMS

A modern JAMstack blog featuring Sanity CMS for content management, Next.js for static generation, AI-powered semantic search, and serverless functions for contact forms and newsletter subscriptions.

## 🚀 Features

- **Static Site Generation (SSG)** with Next.js
- **Headless CMS** using Sanity for managing blog posts in Markdown
- **AI-Powered Search** with semantic understanding (OpenAI/Hugging Face integration)
- **Serverless Functions** for contact forms and newsletter signup
- **Responsive Design** with TailwindCSS and Framer Motion animations
- **Global CDN Deployment** via Vercel or Netlify

## 🛠 Tech Stack

- **Frontend**: Next.js (React-based)
- **CMS**: Sanity (headless CMS)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Deployment**: Vercel / Netlify
- **AI Search**: OpenAI API / Hugging Face

## 📁 Project Structure

```
jamstack-blog/
├── sanity/                         # Sanity CMS project
│   ├── schemas/                    # Blog schema definitions
│   │   ├── blog.js
│   │   └── author.js
│   ├── deskStructure.js
│   └── sanity.config.js
├── web/                            # Next.js frontend
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── pages/                  # Next.js pages
│   │   │   ├── index.js            # Homepage
│   │   │   ├── blog/[slug].js      # Dynamic blog page
│   │   │   ├── api/                # Serverless API routes
│   │   │   │   ├── contact.js      # Contact form handling
│   │   │   │   └── subscribe.js    # Newsletter signup
│   │   │   └── _app.js             # Global app wrapper
│   │   ├── components/             # Reusable UI components
│   │   ├── lib/                    # API helpers and utilities
│   │   ├── styles/                 # Global CSS
│   │   └── hooks/                  # React hooks
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── next.config.js
│   └── package.json
├── .env.local                      # Environment variables
├── netlify.toml                    # Netlify deployment config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity CLI: `npm install -g @sanity/cli`
- Vercel CLI or Netlify CLI (for deployment)

### 1. Clone and Setup

```bash
# Install dependencies for the web app
cd web
npm install

# Install dependencies for Sanity CMS
cd ../sanity
npm install
```

### 2. Environment Variables

Copy `.env.local` and fill in your API keys:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# AI Search (choose one)
OPENAI_API_KEY=your_openai_api_key
# or
HUGGINGFACE_API_KEY=your_huggingface_api_key

# Email Service
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
```

### 3. Setup Sanity CMS

```bash
# Initialize Sanity project
cd sanity
sanity init

# Start Sanity Studio locally
sanity start
```

### 4. Run the Development Server

```bash
# In the web directory
cd web
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

### 5. Build for Production

```bash
# Build the static site
npm run build

# Export static files
npm run export
```

## 📝 Content Management

### Adding Blog Posts

1. Go to your Sanity Studio (usually at http://localhost:3333)
2. Navigate to "Blog Posts" in the desk
3. Click "Create new blog post"
4. Fill in the title, content (Markdown), categories, and author
5. Publish the post

### Managing Authors

1. In Sanity Studio, go to "Authors"
2. Create author profiles with name, bio, image, and social links

## 🔍 AI Search Setup

### OpenAI Integration

1. Get your API key from [OpenAI](https://platform.openai.com/)
2. Add it to `.env.local` as `OPENAI_API_KEY`
3. The search will use GPT models for semantic understanding

### Hugging Face Integration

1. Get your API key from [Hugging Face](https://huggingface.co/)
2. Add it to `.env.local` as `HUGGINGFACE_API_KEY`
3. Uses transformer models for semantic search

## 📧 Newsletter Setup (Mailchimp)

1. Get your Mailchimp API key and List ID
2. Add them to `.env.local`
3. The newsletter signup form will automatically add subscribers

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
netlify deploy --prod
```

## 📚 API Routes

### Contact Form

- **Endpoint**: `/api/contact`
- **Method**: POST
- **Body**: `{ name, email, message }`
- **Response**: Success/error message

### Newsletter Subscription

- **Endpoint**: `/api/subscribe`
- **Method**: POST
- **Body**: `{ email }`
- **Response**: Success/error message

## 🎨 Customization

### Styling

- Modify `tailwind.config.js` for theme colors and fonts
- Update `web/src/styles/globals.css` for global styles
- Customize components in `web/src/components/`

### Search Algorithm

- Enhance AI search in `web/src/lib/aiSearch.js`
- Add more sophisticated embeddings and similarity matching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Sanity](https://www.sanity.io/) for the headless CMS
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [OpenAI](https://openai.com/) for AI capabilities
