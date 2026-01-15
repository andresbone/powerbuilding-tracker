# Powerbuilding Tracker

A mobile-first PWA for tracking powerbuilding workouts based on Jeff Nippard's "The Powerbuilding System".

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Deploy**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (for backend)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/          # shadcn/ui components
└── lib/             # Utility functions and helpers
```

## Core Features (Planned)

- ✅ Smart Logger: Pre-calculated weights based on 1RM
- ✅ Manual 1RM entry and tracking
- ✅ Workout templates with supersets
- ✅ Set logging with RPE tracking
- ✅ Mobile-optimized UI (large buttons, minimal clicks)

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Philosophy

**"Keep it Simple"** - Prioritizing usability in the gym with fewer clicks and large, easy-to-tap inputs over visual complexity.

## License

MIT
