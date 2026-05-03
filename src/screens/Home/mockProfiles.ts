// ── Profile type ──────────────────────────────────────────────────────────────
export interface Profile {
  id: string;
  name: string;
  age: number;
  distance: number;    // km
  job: string;
  company: string;
  matchPercent: number;
  online: boolean;
  interests: string[];
  /** require() image asset, or null to show the placeholder card */
  image: number | null;
  /** Fallback card background when image is null */
  placeholderBg: string;
  /** Lighter accent used for the placeholder silhouette */
  placeholderAccent: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
// To add real photos: drop them into src/assets/images/profiles/
// then swap null with: require('../../assets/images/profiles/aurora.jpg')
export const MOCK_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'Aurora',
    age: 26,
    distance: 2,
    job: 'Creative Director',
    company: 'Vogue',
    matchPercent: 94,
    online: true,
    interests: ['Photography', 'Jazz', 'Hiking', 'Wine'],
    image: null,
    placeholderBg: '#1A0828',
    placeholderAccent: 'rgba(233,30,140,0.18)',
  },
  {
    id: '2',
    name: 'Maya',
    age: 25,
    distance: 5,
    job: 'UX Designer',
    company: 'Figma',
    matchPercent: 88,
    online: true,
    interests: ['Art', 'Coffee', 'Travel', 'Yoga'],
    image: null,
    placeholderBg: '#071530',
    placeholderAccent: 'rgba(123,47,190,0.25)',
  },
  {
    id: '3',
    name: 'Sofia',
    age: 27,
    distance: 8,
    job: 'Chef',
    company: 'Nobu',
    matchPercent: 79,
    online: false,
    interests: ['Cooking', 'Wine', 'Music', 'Dancing'],
    image: null,
    placeholderBg: '#200D00',
    placeholderAccent: 'rgba(245,165,35,0.2)',
  },
  {
    id: '4',
    name: 'Emma',
    age: 24,
    distance: 3,
    job: 'Photographer',
    company: 'National Geographic',
    matchPercent: 91,
    online: true,
    interests: ['Photography', 'Hiking', 'Cats', 'Reading'],
    image: null,
    placeholderBg: '#071E2A',
    placeholderAccent: 'rgba(30,180,233,0.18)',
  },
];
