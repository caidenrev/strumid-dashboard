# PT Strum Technology Asia - EV Dashboard

A modern, responsive Business Intelligence Dashboard for visualizing social media marketing performance (Instagram and TikTok) for an electric vehicle conversion startup.

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Nova preset)
- **Recharts** (for data visualization)
- **Lucide React** (for icons)
- **next-themes** (for dark mode)
- **date-fns** (for date formatting)

## ✨ Features

### Core Features
- **Responsive Dashboard Layout** with fixed sidebar navigation
- **Light/Dark Mode Toggle** using shadcn/ui conventions
- **Date Range Picker** for filtering data
- **Platform Filter** (All, Instagram, TikTok)
- **Export Report** functionality (ready for implementation)

### KPI Cards
- Total Reach with trend indicators
- Average Engagement Rate
- Profile/Link Clicks
- Estimated Revenue from Leads

### Data Visualizations
- **Area Chart**: Reach & Impressions Trend comparing Instagram and TikTok
- **Bar Chart**: Audience Demographics by age groups
- **Data Table**: Recent Top Performing Posts with hover effects

### Navigation Pages
- Overview (Dashboard)
- Instagram Analytics
- TikTok Analytics
- Audience Insights
- Settings

## 🎨 Design System

### Color Palette
- **Base**: Neutral zinc/slate tones
- **Primary Accent**: Electric blue (#488BF2) representing EVs
- **Instagram**: #E4405F
- **TikTok**: #00F2EA

### UI/UX Principles
- Modern, clean, and minimalist design
- Soft drop shadows and rounded corners (rounded-xl, rounded-lg)
- Subtle borders for cards and containers
- Polished, enterprise-grade feel
- Professional typography with Inter font

## 📁 Project Structure

```
ev-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main dashboard page
│   ├── globals.css         # Global styles and theme variables
│   ├── instagram/          # Instagram analytics page
│   ├── tiktok/             # TikTok analytics page
│   ├── audience/           # Audience insights page
│   └── settings/           # Settings page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── dashboard-sidebar.tsx
│   ├── dashboard-header.tsx
│   ├── kpi-card.tsx
│   ├── reach-chart.tsx
│   ├── demographics-chart.tsx
│   ├── top-posts-table.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
└── lib/
    ├── mock-data.ts        # Mock data for development
    └── utils.ts            # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd ev-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Development

### Mock Data
The dashboard currently uses realistic mock data located in `lib/mock-data.ts`. This data includes:
- KPI metrics with trend indicators
- 30 days of reach/impressions data
- Demographic distributions
- Top performing posts with EV-related content

### Adding Real Data Integration

The architecture is designed to easily integrate real APIs:

1. **Create API Routes** (Next.js Server Actions):
```typescript
// app/actions/instagram.ts
'use server'

export async function getInstagramMetrics() {
  // Integrate Meta Graph API
  const response = await fetch('https://graph.facebook.com/...')
  return response.json()
}
```

2. **Add Database Layer** (Prisma/Drizzle):
```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()
```

3. **Replace Mock Data**:
```typescript
// app/page.tsx
import { getInstagramMetrics } from './actions/instagram'

export default async function Home() {
  const data = await getInstagramMetrics()
  // Use real data instead of mock data
}
```

## 🎯 Future Enhancements

- [ ] Integrate Meta Graph API for Instagram data
- [ ] Integrate TikTok API for TikTok data
- [ ] Add database (PostgreSQL with Prisma/Drizzle)
- [ ] Implement export functionality (PDF/CSV)
- [ ] Add real-time data updates
- [ ] Implement user authentication
- [ ] Add more detailed analytics pages
- [ ] Create custom date range comparisons
- [ ] Add notification system for performance alerts

## 📊 Mock Data Context

All mock data is themed around PT Strum Technology Asia's EV conversion business:
- Electric motorcycle conversions
- Battery pack reviews
- Cost savings analysis
- Environmental benefits
- Installation processes
- Performance testing

## 🎨 Customization

### Changing Theme Colors
Edit `app/globals.css` to modify the color palette:
```css
:root {
  --primary: oklch(0.488 0.243 264.376); /* Electric blue */
  /* Modify other color variables */
}
```

### Adding New Components
Use shadcn/ui CLI to add more components:
```bash
npx shadcn@latest add [component-name]
```

## 📝 License

This project is created for PT Strum Technology Asia.

## 🤝 Contributing

This is a custom dashboard for PT Strum Technology Asia. For modifications or enhancements, please contact the development team.

---

Built with ⚡ by Kiro AI for PT Strum Technology Asia
