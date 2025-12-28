# vSwift Logistics

Professional Removals & Waste Disposal Services website built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Premium, minimalist design with Light Blue and White branding
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with Framer Motion
- 🎯 Liquid swipe navigation for services
- 📋 Interactive bottom sheet for service details
- 🖼️ Hero section with professional removals imagery

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 10.12.4 or higher

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

This project is configured for deployment on Netlify.

### Netlify Setup

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the `netlify.toml` configuration
3. The build command and publish directory are pre-configured
4. Deploy!

The site will be automatically deployed on every push to the main branch.

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── src/
│   ├── components/     # React components
│   │   ├── layout/     # Header, Footer
│   │   ├── sections/   # Hero, About, Services
│   │   ├── ui/         # LiquidCard, LiquidDots
│   │   └── overlay/    # BottomSheet
│   ├── context/        # React Context (UI state)
│   └── data/           # Service data
├── public/             # Static assets
└── netlify.toml        # Netlify configuration
```

## License

Private - All rights reserved
