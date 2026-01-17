# Martes

**Martes** is your intelligent powerbuilding training companion - a mobile-first PWA for tracking workouts based on Jeff Nippard's "The Powerbuilding System" with smart coaching features and advanced analytics.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Charts**: Recharts
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
│   ├── ui/          # shadcn/ui components
│   ├── dashboard/   # Dashboard-specific components
│   └── workout/     # Workout-specific components
└── lib/             # Utility functions and helpers
    ├── logic/       # Business logic (Smart Coach)
    └── supabase/    # Supabase client and types
```

## Core Features

- ✅ **Smart Logger**: Pre-calculated weights based on 1RM
- ✅ **1RM Management**: Manual 1RM entry and tracking
- ✅ **Workout Templates**: Structured workouts with supersets
- ✅ **RPE Tracking**: Set logging with Rate of Perceived Exertion
- ✅ **Smart Coach**: AI-powered weight suggestions based on RPE and performance
- ✅ **Rest Timer**: Persistent countdown timer during workouts
- ✅ **Advanced Analytics**: Interactive charts showing volume and strength progression
- ✅ **Mobile-Optimized**: Large buttons, minimal clicks, gym-friendly UI

## Smart Features

### The Smart Coach
Intelligent training algorithms that help you autoregulate your workouts:
- **E1RM Calculator**: Epley formula for estimating 1RM from any rep range
- **Weight Suggestions**: Automatic weight recommendations based on RPE feedback
- **Daily Performance**: Real-time strength estimation adjusted for fatigue

### Rest Timer
A floating, persistent timer that stays visible during your entire workout:
- Quick presets (+30s, +1m)
- Play/Pause/Reset controls
- Always accessible at the bottom of the screen

### Analytics Dashboard
Visual insights into your training progress:
- **Volume Chart**: Weekly training volume trends
- **Strength Chart**: Historical 1RM vs. Daily estimated 1RM
- Carousel navigation for easy metric switching

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Philosophy

**"Keep it Simple"** - Prioritizing usability in the gym with fewer clicks and large, easy-to-tap inputs over visual complexity. Smart features work in the background to enhance your training without adding complexity.

## License

MIT
