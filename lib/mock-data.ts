// Mock data for the EV Dashboard
export interface KPIData {
  totalReach: number;
  reachTrend: number;
  avgEngagementRate: number;
  engagementTrend: number;
  profileClicks: number;
  clicksTrend: number;
  estRevenue: number;
  revenueTrend: number;
}

export interface ReachData {
  date: string;
  instagram: number;
  tiktok: number;
}

export interface DemographicData {
  category: string;
  instagram: number;
  tiktok: number;
}

export interface TopPost {
  id: string;
  platform: 'instagram' | 'tiktok';
  thumbnail: string;
  title: string;
  reach: number;
  engagement: number;
  clicks: number;
  date: string;
}

export const kpiData: KPIData = {
  totalReach: 125000,
  reachTrend: 5.2,
  avgEngagementRate: 4.5,
  engagementTrend: 2.1,
  profileClicks: 1200,
  clicksTrend: 8.3,
  estRevenue: 45000000,
  revenueTrend: 12.5,
};

export const reachTrendData: ReachData[] = [
  { date: '2026-04-04', instagram: 3200, tiktok: 4100 },
  { date: '2026-04-05', instagram: 3500, tiktok: 4300 },
  { date: '2026-04-06', instagram: 3100, tiktok: 3900 },
  { date: '2026-04-07', instagram: 4200, tiktok: 5100 },
  { date: '2026-04-08', instagram: 3800, tiktok: 4600 },
  { date: '2026-04-09', instagram: 4500, tiktok: 5300 },
  { date: '2026-04-10', instagram: 4100, tiktok: 4900 },
  { date: '2026-04-11', instagram: 3900, tiktok: 4700 },
  { date: '2026-04-12', instagram: 4300, tiktok: 5200 },
  { date: '2026-04-13', instagram: 4600, tiktok: 5500 },
  { date: '2026-04-14', instagram: 5200, tiktok: 6100 },
  { date: '2026-04-15', instagram: 4800, tiktok: 5700 },
  { date: '2026-04-16', instagram: 5100, tiktok: 5900 },
  { date: '2026-04-17', instagram: 4900, tiktok: 5600 },
  { date: '2026-04-18', instagram: 5300, tiktok: 6200 },
  { date: '2026-04-19', instagram: 5600, tiktok: 6500 },
  { date: '2026-04-20', instagram: 5400, tiktok: 6300 },
  { date: '2026-04-21', instagram: 5800, tiktok: 6700 },
  { date: '2026-04-22', instagram: 6100, tiktok: 7000 },
  { date: '2026-04-23', instagram: 5900, tiktok: 6800 },
  { date: '2026-04-24', instagram: 6300, tiktok: 7200 },
  { date: '2026-04-25', instagram: 6500, tiktok: 7400 },
  { date: '2026-04-26', instagram: 6200, tiktok: 7100 },
  { date: '2026-04-27', instagram: 6700, tiktok: 7600 },
  { date: '2026-04-28', instagram: 7000, tiktok: 7900 },
  { date: '2026-04-29', instagram: 6800, tiktok: 7700 },
  { date: '2026-04-30', instagram: 7200, tiktok: 8100 },
  { date: '2026-05-01', instagram: 7500, tiktok: 8400 },
  { date: '2026-05-02', instagram: 7300, tiktok: 8200 },
  { date: '2026-05-03', instagram: 7800, tiktok: 8600 },
];

export const demographicData: DemographicData[] = [
  { category: '18-24', instagram: 2800, tiktok: 4200 },
  { category: '25-34', instagram: 4500, tiktok: 3800 },
  { category: '35-44', instagram: 3200, tiktok: 2100 },
  { category: '45-54', instagram: 1800, tiktok: 900 },
  { category: '55+', instagram: 700, tiktok: 400 },
];

export const topPosts: TopPost[] = [
  {
    id: '1',
    platform: 'tiktok',
    thumbnail: '🏍️',
    title: 'Konversi Motor Listrik - Before & After',
    reach: 45200,
    engagement: 6.8,
    clicks: 342,
    date: '2026-05-02',
  },
  {
    id: '2',
    platform: 'instagram',
    thumbnail: '⚡',
    title: 'Hemat BBM dengan Konversi EV',
    reach: 38900,
    engagement: 5.4,
    clicks: 289,
    date: '2026-05-01',
  },
  {
    id: '3',
    platform: 'tiktok',
    thumbnail: '🔋',
    title: 'Review Battery Pack 72V - Jarak Tempuh',
    reach: 52100,
    engagement: 7.2,
    clicks: 401,
    date: '2026-04-30',
  },
  {
    id: '4',
    platform: 'instagram',
    thumbnail: '🌱',
    title: 'Ramah Lingkungan & Ekonomis',
    reach: 31200,
    engagement: 4.9,
    clicks: 198,
    date: '2026-04-29',
  },
  {
    id: '5',
    platform: 'tiktok',
    thumbnail: '🛠️',
    title: 'Proses Instalasi Conversion Kit',
    reach: 48700,
    engagement: 6.5,
    clicks: 356,
    date: '2026-04-28',
  },
  {
    id: '6',
    platform: 'instagram',
    thumbnail: '💰',
    title: 'Hitung-hitungan ROI Motor Listrik',
    reach: 29800,
    engagement: 5.1,
    clicks: 234,
    date: '2026-04-27',
  },
  {
    id: '7',
    platform: 'tiktok',
    thumbnail: '🚀',
    title: 'Top Speed Test Motor Listrik Strum',
    reach: 61300,
    engagement: 8.1,
    clicks: 478,
    date: '2026-04-26',
  },
  {
    id: '8',
    platform: 'instagram',
    thumbnail: '🔌',
    title: 'Cara Charging yang Benar',
    reach: 27500,
    engagement: 4.6,
    clicks: 176,
    date: '2026-04-25',
  },
];
