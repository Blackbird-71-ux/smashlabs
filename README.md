# SmashLabs - Break Free. Smash Stress.

A modern web application for SmashLabs, a unique stress relief and team building experience. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎥 Hero video section with optimized loading
- 📱 Responsive design for all devices
- 🎨 Modern UI with smooth animations
- 🔍 SEO optimized with metadata
- 📊 Analytics tracking
- ♿ Accessibility features
- 🚀 Performance optimized
- 🔄 Error boundary handling
- ⚡ Loading skeletons for better UX

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Analytics](https://analytics.google.com/) - Analytics tracking

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/smashlabs.git
   cd smashlabs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_SITE_URL=https://smashlabs.in
   NEXT_PUBLIC_GA_ID=your-ga-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
smashlabs/
├── public/              # Static files
├── src/
│   ├── app/            # App router pages
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   └── styles/        # Global styles
├── .env.local         # Environment variables
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

## Development

### Code Style

- Follow the [TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
- Use [Prettier](https://prettier.io/) for code formatting
- Follow [ESLint](https://eslint.org/) rules

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

The application is deployed on [Vercel](https://vercel.com/). Each push to the main branch triggers a new deployment.

### Environment Variables

Make sure to set the following environment variables in your Vercel project:

- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/smashlabs](https://github.com/yourusername/smashlabs) 
